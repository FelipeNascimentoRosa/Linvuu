import io
import json
from pathlib import Path
import tempfile
import unittest
import urllib.error
from unittest.mock import patch

import coletar
import configurar


class AuditTests(unittest.TestCase):
    def test_legacy_installer_cli_refuses_to_apply(self):
        with patch('sys.argv', ['configurar.py', '--apply']), patch.object(configurar, 'configure') as called:
            with self.assertRaisesRegex(SystemExit, 'aposentado'):
                configurar.main()
            called.assert_not_called()

    def test_public_or_unknown_repository_visibility_is_denied(self):
        env = {'GITHUB_REPOSITORY': 'FelipeNascimentoRosa/Linvuu', 'GITHUB_REF': 'refs/heads/main'}
        for event in [{}, {'repository': {'private': False}}, {'repository': {'private': 'true'}}]:
            with self.subTest(event=event), self.assertRaises(SystemExit):
                coletar.validate_github_context(env, event)
        coletar.validate_github_context(env, {'repository': {'private': True}})
        with self.assertRaises(SystemExit):
            coletar.validate_github_context({**env, 'GITHUB_REF': 'refs/heads/other'}, {'repository': {'private': True}})

    def test_pages_and_exact_rules_and_read_methods(self):
        calls = []
        def fake(req, **kwargs):
            calls.append((req.full_url, req.get_method(), req.data))
            if req.full_url.endswith('/v1/projects/linvuu'):
                data = {'projectNumber': coletar.NUMBER}
            elif req.full_url.endswith('/databases'):
                data = {'databases': [{'name': 'projects/linvuu/databases/(default)'}]}
            elif req.full_url.endswith('/releases'):
                data = {'nextPageToken': 'second'}
            elif '/releases?pageToken=second' in req.full_url:
                data = {'releases': [{'name': 'projects/linvuu/releases/cloud.firestore', 'rulesetName': 'projects/linvuu/rulesets/abc-123'}]}
            elif '/rulesets/abc-123' in req.full_url:
                data = {'source': {'files': [{'content': 'rules_version = "2";\n'}]}}
            elif req.full_url.endswith('/serviceAccounts'):
                data = {'accounts': [{'email': 'audit@linvuu.iam.gserviceaccount.com'}]}
            else:
                data = {}
            return io.BytesIO(json.dumps(data).encode())
        with tempfile.TemporaryDirectory() as directory:
            rules = Path(directory) / 'firestore.rules'
            rules.write_text('rules_version = "2";\n')
            reader = coletar.Reader('fake-token-not-real', Path(directory) / 'out', fake)
            result = coletar.collect(reader, rules)
            self.assertTrue(result['rulesComparison']['exactMatch'])
            self.assertEqual(result['readFailures'], [])
            self.assertTrue(any('pageToken=second' in url for url, _, _ in calls))
            for url, method, body in calls:
                self.assertNotIn('/documents', url)
                self.assertNotIn('getKeyString', url)
                self.assertTrue(method == 'GET' or (method == 'POST' and ':getIamPolicy' in url))
            self.assertEqual(json.loads(next(body for _, method, body in calls if method == 'POST')), {'options': {'requestedPolicyVersion': 3}})
            self.assertNotIn('fake-token-not-real', ''.join(p.read_text() for p in reader.out.iterdir()))
            rules.write_text('changed\n')
            self.assertFalse(coletar.collect(coletar.Reader('fake-token-not-real', Path(directory) / 'drift', fake), rules)['rulesComparison']['exactMatch'])

    def test_denied_is_not_empty_success_and_token_is_redacted(self):
        def denied(req, **kwargs):
            raise urllib.error.HTTPError(req.full_url, 403, 'denied', {}, io.BytesIO(b'fake-token-not-real'))
        with tempfile.TemporaryDirectory() as directory:
            reader = coletar.Reader('fake-token-not-real', directory, denied)
            result = reader.request('rules', 'projects/linvuu/releases', 'denied')
            self.assertEqual(result['httpStatus'], 403)
            self.assertEqual(reader.failures, ['denied'])
            self.assertNotIn('fake-token-not-real', (Path(directory) / 'denied.json').read_text())

    def test_wrong_project_stops_before_policy_reads(self):
        calls = []
        def wrong(req, **kwargs):
            calls.append(req.full_url)
            return io.BytesIO(b'{"projectNumber":"371272154247"}')
        with tempfile.TemporaryDirectory() as directory:
            with self.assertRaises(RuntimeError):
                coletar.collect(coletar.Reader('fake-token-not-real', directory, wrong), 'unused')
        self.assertEqual(len(calls), 1)

    def test_setup_wrong_account_performs_no_mutations(self):
        with patch.object(configurar.subprocess, 'check_output', return_value='felipevaleevarosa@gmail.com\n'), patch.object(configurar, 'run') as run:
            with self.assertRaises(RuntimeError):
                configurar.configure()
            run.assert_not_called()

    def test_permission_scope_and_oidc_claims(self):
        self.assertTrue(all(permission.rsplit('.', 1)[1] in {'get', 'list', 'getIamPolicy'} for permission in configurar.PERMISSIONS))
        for blocked in ['datastore.entities.get', 'firebaseauth.users.get', 'apikeys.keys.getKeyString', 'iam.serviceAccountKeys.create']:
            self.assertNotIn(blocked, configurar.PERMISSIONS)
        for claim in ['repository_id', 'repository_owner_id', 'ref', 'workflow_ref']:
            self.assertIn('assertion.' + claim, configurar.CONDITION)

    def test_existing_pool_with_other_provider_is_not_trusted(self):
        calls = []
        def fake_run(args, missing=False):
            calls.append(args)
            if args[:2] == ['projects', 'describe']:
                return {'projectNumber': configurar.NUMBER}
            if args[:3] == ['iam', 'roles', 'describe']:
                return {'includedPermissions': configurar.PERMISSIONS, 'stage': 'GA'}
            if args[:3] == ['iam', 'workload-identity-pools', 'describe']:
                return {'state': 'ACTIVE'}
            if args[:4] == ['iam', 'workload-identity-pools', 'providers', 'list']:
                return [{'name': 'projects/982052790317/locations/global/workloadIdentityPools/linvuu-auditoria/providers/other'}]
            return {}
        with patch.object(configurar.subprocess, 'check_output', return_value='hello.linvuu@gmail.com\n'), patch.object(configurar, 'run', side_effect=fake_run):
            with self.assertRaisesRegex(RuntimeError, 'outros providers'):
                configurar.configure()
        self.assertFalse(any('add-iam-policy-binding' in args for args in calls))


if __name__ == '__main__':
    unittest.main()

# Segurança

Detalhes técnicos, o que já está ativo e o que depende de configuração no painel de cada serviço: [docs/SEGURANCA.md](docs/SEGURANCA.md).

- **Segredos nunca entram no repositório.** Chaves (Firebase Admin, Gemini, Stripe, Azure) ficam nas variáveis do Render e nos *Secrets* do GitHub. O `.env*` está no `.gitignore` e o GitHub Actions faz uma varredura de segredos a cada mudança e toda semana.
- **Não cole chaves nem tokens em chats.** Se uma chave vazar, revogue na hora e crie outra.
- **Tokens do GitHub:** use tokens *fine-grained*, só para este repositório, com validade curta (7 a 30 dias) e só as permissões necessárias (Contents e Pull requests).
- **Mudanças entram por pull request com o CI verde** (build, auditoria de dependências e teste de segurança do servidor). Atenção: a proteção técnica da `main` (bloquear push direto) exige GitHub Pro em repositório privado e **ainda não está ativa**; veja o passo em docs/SEGURANCA.md.
- Ative a verificação em duas etapas no GitHub, no Render, no Google (Firebase), no Stripe e no Registro.br.
- Para reportar um problema de segurança: contato@linvuu.com.br. Responda sem divulgar o problema antes da correção.

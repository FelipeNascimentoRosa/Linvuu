import { APK } from '../plataforma';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { carregarAuth } from '../lib/firebase';
import { api } from '../lib/api';
import { usePageTitle } from '../lib/usePageTitle';
import { precosDo } from '../config/planos';
import { LOCALE, T } from '../i18n';

type Estado = 'carregando' | 'liberado' | 'entrar' | 'assinar' | 'indisponivel';

export default function LivroGramatica() {
  usePageTitle('Gramática russa A1–A2', 'O livro de gramática russa da Linvuu, do A1 ao A2, explicado em português. Para assinantes.', [], true);
  const { usuario, carregando } = useAuth();
  const [estado, setEstado] = useState<Estado>('carregando');
  const [html, setHtml] = useState('');

  useEffect(() => {
    if (carregando) return;
    if (!usuario) { setEstado('entrar'); return; }
    let vivo = true;
    (async () => {
      const { auth } = await carregarAuth();
      const token = await auth.currentUser?.getIdToken();
      const r = await fetch(api('/api/livros/gramatica-ru'), { headers: token ? { Authorization: `Bearer ${token}` } : {} });
      if (!vivo) return;
      if (r.status === 402) { setEstado('assinar'); return; }
      if (r.status === 503) { setEstado('indisponivel'); return; }
      if (!r.ok) { setEstado('entrar'); return; }
      const texto = await r.text();
      if (!vivo) return;
      setHtml(texto);
      setEstado('liberado');
    })().catch(() => { if (vivo) setEstado('indisponivel'); });
    return () => { vivo = false; };
  }, [usuario, carregando]);

  if (estado === 'liberado') {
    return (
      <div style={{ maxWidth: 1180, margin: '0 auto', padding: '16px 16px 0' }}>
        <aside className="lv-atencao" style={{ margin: '0 0 16px' }}>
          <p className="lv-eyebrow">O livro faz parte do curso</p>
          <p>A gramática russa da Linvuu não é vendida avulsa. Ela está incluída na assinatura, {!APK && <>por {precosDo(LOCALE.codigo).mensal} por mês{precosDo(LOCALE.codigo).moeda === 'BRL' ? <>, ou {precosDo(LOCALE.codigo).trimestral} por 3 meses no cartão ou boleto.</> : '.'}</>} Quem tem acesso ativo pode ler o livro inteiro.</p>
          <p>Copiar, baixar, redistribuir ou compartilhar o conteúdo, total ou em parte, é proibido. Quem fizer isso perde o acesso ao curso.</p>
        </aside>
        <iframe title="Gramática russa A1–A2" srcDoc={html} sandbox="" style={{ width: '100%', height: 'calc(100vh - 230px)', border: 0, display: 'block' }} />
      </div>
    );
  }

  return (
    <main className="lv-folha" style={{ maxWidth: 760, margin: '0 auto', padding: '48px 20px' }}>
      {LOCALE.codigo !== 'pt-BR' && <p className="nota" lang={LOCALE.codigo}>{T.livro.indisponivelIdioma}</p>}
      <p className="lv-eyebrow">Livro · Russo · A1–A2</p>
      <h1 className="lv-h1">A gramática russa que faltava para o estudante brasileiro.</h1>
      <p className="lv-lead">Dez aulas, do gênero dos substantivos ao genitivo, explicadas em português, com exemplos em frases curtas, quadros-resumo e exercícios com gabarito. Pensada para quem tem dificuldade com gramática e quer entender a lógica das terminações, não só decorar tabelas.</p>
      {estado === 'carregando' && <p className="lv-nota">Carregando…</p>}
      {estado === 'entrar' && (
        <p><Link className="btn btn-primary" to="/entrar">Entrar para ler</Link></p>
      )}
      {estado === 'assinar' && (
        <>
      <aside className="lv-atencao" style={{ margin: '0 0 16px' }}>
        <p className="lv-eyebrow">O livro faz parte do curso</p>
        <p>A gramática russa da Linvuu não é vendida avulsa. Ela está incluída na assinatura, {!APK && <>por {precosDo(LOCALE.codigo).mensal} por mês{precosDo(LOCALE.codigo).moeda === 'BRL' ? <>, ou {precosDo(LOCALE.codigo).trimestral} por 3 meses no cartão ou boleto.</> : '.'}</>} Quem tem acesso ativo pode ler o livro inteiro.</p>
        <p>Copiar, baixar, redistribuir ou compartilhar o conteúdo, total ou em parte, é proibido. Quem fizer isso perde o acesso ao curso.</p>
      </aside>
          <p><Link className="btn btn-primary" to="/assinatura">Ver planos</Link></p>
        </>
      )}
      {estado === 'indisponivel' && <p>Estamos com a leitura indisponível agora. Tente de novo em instantes.</p>}
    </main>
  );
}


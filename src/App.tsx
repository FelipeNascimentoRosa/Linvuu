import { lazy, Suspense, useEffect } from 'react';
import { APK } from './plataforma';
import { AnalyticsConsent } from './components/AnalyticsConsent';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Home from '@plataforma/Home';
import Cursos from '@plataforma/Cursos';
// Portugues, Sobre, PorQue, Contato e ExcluirConta só existem no site: no build do APK o vite.config troca esses módulos por um vazio.
const Curso = lazy(() => import('@plataforma/Curso'));
const Dia = lazy(() => import('@plataforma/Dia'));
const Conta = lazy(() => import('./pages/Conta'));
const Assinatura = lazy(() => import('@plataforma/Assinatura'));
const Legal = lazy(() => import('@plataforma/Legal').then((m) => ({ default: m.Legal })));
const Gramatica = lazy(() => import('./pages/Gramatica'));
const LivroGramatica = lazy(() => import('@plataforma/LivroGramatica'));
const LivrosIndice = lazy(() => import('./pages/Livros').then((m) => ({ default: m.LivrosIndice })));
const LivroPagina = lazy(() => import('./pages/Livros').then((m) => ({ default: m.LivroPagina })));
const LivroCapitulo = lazy(() => import('./pages/Livros').then((m) => ({ default: m.LivroCapitulo })));
const Sobre = lazy(() => import('./pages/Sobre'));
const AulasRusso = lazy(() => import('./pages/AulasRusso'));
// Materiais gratuitos (guias de alfabeto): só existe no site, em português; no APK o módulo vira vazio (vite.config).
const MateriaisIndice = lazy(() => import('./pages/MateriaisGratuitos').then((m) => ({ default: m.MateriaisIndice })));
const AlfabetoPagina = lazy(() => import('./pages/MateriaisGratuitos').then((m) => ({ default: m.AlfabetoPagina })));
const PorQue = lazy(() => import('./pages/PorQue'));
const Contato = lazy(() => import('./pages/Contato'));
const ExAlunosUdemy = lazy(() => import('./pages/ExAlunosUdemy'));
const ExcluirConta = lazy(() => import('./pages/ExcluirConta'));
import { Header, BarraInferior, Footer, PrimeiraAbertura } from '@plataforma/Chrome';
import { SugestaoIdioma } from './components/SugestaoIdioma';
import NaoEncontrada from './pages/NaoEncontrada';
import Carregando from './components/Carregando';
import { useT } from './i18n';

function RolarAoTopo() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      // Rotas lazy podem montar depois do efeito: aguarda o destino real, sem atrasar a navegação.
      const rolar = () => { const alvo = document.getElementById(hash.slice(1)); if (!alvo) return false; alvo.scrollIntoView(); return true; };
      if (rolar()) return;
      const observer = new MutationObserver(() => { if (rolar()) observer.disconnect(); });
      observer.observe(document.getElementById('conteudo-principal') ?? document.body, { childList: true, subtree: true });
      const limite = setTimeout(() => observer.disconnect(), 5000);
      return () => { clearTimeout(limite); observer.disconnect(); };
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Páginas de dia da área do aluno (/curso/:id/dia/:n): sem bloco de newsletter no rodapé.
const AREA_ALUNO = /^\/curso\/[^/]+\/dia\//;
// Dentro do app Android: sem a barra de idiomas do topo e sem o rodapé longo; navegação por abas embaixo.
const NATIVO = APK;
if (NATIVO && typeof document !== 'undefined') document.documentElement.dataset.plataforma = 'nativo';

export default function App() {
  const { pathname } = useLocation();
  const t = useT();
  return (
    <>
      <a href="#conteudo-principal" className="skip-link">{t.geral.pular}</a>
      <RolarAoTopo />
      {!NATIVO && <SugestaoIdioma />}
      <Header />
      <main id="conteudo-principal" className={!NATIVO ? 'site-camadas' : undefined} tabIndex={-1}>
        <Suspense fallback={<Carregando />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cursos" element={<Cursos />} />
          <Route path="/portugues" element={<Navigate to={NATIVO ? '/' : '/curso/br'} replace />} />
          <Route path="/brazilian-portuguese" element={<Navigate to="/curso/br" replace />} />
          <Route path="/curso/:id" element={<Curso />} />
          <Route path="/curso/:id/dia/:n" element={<Dia />} />
          <Route path="/entrar" element={<Conta modo="entrar" />} />
          <Route path="/cadastro" element={<Conta modo="cadastro" />} />
          <Route path="/gramatica" element={<Gramatica />} />
          <Route path="/gramatica/:id" element={<Gramatica />} />
          <Route path="/livro/gramatica-ru" element={<LivroGramatica />} />
          <Route path="/livros" element={<LivrosIndice />} />
          <Route path="/livros/:id" element={<LivroPagina />} />
          <Route path="/livros/:id/capitulo/:n" element={<LivroCapitulo />} />
          <Route path="/materiais-gratuitos" element={NATIVO ? <Navigate to="/" replace /> : <MateriaisIndice />} />
          <Route path="/materiais-gratuitos/:slug" element={NATIVO ? <Navigate to="/" replace /> : <AlfabetoPagina />} />
          <Route path="/russo-online" element={NATIVO ? <Navigate to="/" replace /> : <AulasRusso />} />
          <Route path="/sobre" element={NATIVO ? <Navigate to="/" replace /> : <Sobre />} />
          <Route path="/por-que-linvuu" element={NATIVO ? <Navigate to="/" replace /> : <PorQue />} />
          <Route path="/contato" element={NATIVO ? <Navigate to="/" replace /> : <Contato />} />
          <Route path="/ex-alunos-udemy" element={NATIVO ? <Navigate to="/" replace /> : <ExAlunosUdemy />} />
          <Route path="/assinatura" element={NATIVO ? <Navigate to="/conta" replace /> : <Assinatura />} />
          {NATIVO && <Route path="/conta" element={<Assinatura />} />}
          <Route path="/privacidade" element={<Legal tipo="privacidade" />} />
          <Route path="/termos" element={<Legal tipo="termos" />} />
          <Route path="/excluir-conta" element={NATIVO ? <Navigate to="/conta#excluir-conta" replace /> : <ExcluirConta />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
        </Suspense>
      </main>
      <AnalyticsConsent />
      {!AREA_ALUNO.test(pathname) && !NATIVO && <Footer />}
      {NATIVO && !AREA_ALUNO.test(pathname) && <BarraInferior />}
      {NATIVO && <PrimeiraAbertura />}
    </>
  );
}


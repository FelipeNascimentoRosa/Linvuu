import { Component, type ErrorInfo, type ReactNode } from 'react';
import { LOCALE } from '../i18n';
import { relatarErro } from '../lib/erros';

// Rede de segurança da aplicação inteira: se qualquer tela falhar ao renderizar, o aluno vê esta página, não um branco.
// Escrita de propósito sem router, sem contexto e sem dicionário: o que quebrou pode ser justamente um deles.
const TEXTOS = {
  'pt-BR': { titulo: 'Esta página não carregou direito', texto: 'Houve um erro inesperado e já registramos o problema. Recarregar costuma resolver.', recarregar: 'Recarregar a página', inicio: 'Ir para o início' },
  en: { titulo: "This page didn't load properly", texto: 'Something unexpected broke, and we have logged it. Reloading usually fixes it.', recarregar: 'Reload the page', inicio: 'Go to the home page' },
} as const;

interface Estado { falhou: boolean }

export class ErroGeral extends Component<{ children: ReactNode }, Estado> {
  state: Estado = { falhou: false };
  static getDerivedStateFromError(): Estado { return { falhou: true }; }
  componentDidCatch(erro: Error, info: ErrorInfo) {
    relatarErro('render', Object.assign(new Error(erro.message), { stack: `${erro.stack ?? ''}\n${info.componentStack ?? ''}` }));
  }
  render() {
    if (!this.state.falhou) return this.props.children;
    const t = LOCALE.codigo === 'en' ? TEXTOS.en : TEXTOS['pt-BR'];
    return (
      <main className="pagina" role="alert">
        <h1 className="pagina-h1">{t.titulo}</h1>
        <p className="lead">{t.texto}</p>
        <p>
          <button type="button" className="btn btn-primary" onClick={() => window.location.reload()}>{t.recarregar}</button>{' '}
          <a href="/" className="btn btn-ghost">{t.inicio}</a>
        </p>
      </main>
    );
  }
}

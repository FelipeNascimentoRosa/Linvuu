/** Remove a política da rota anterior antes de aplicar a da rota atual. */
export function sincronizarRobots(doc: Document, semIndice: boolean, semSeguimento = false) {
  doc.head.querySelectorAll('meta[name="robots"]').forEach(el => el.remove());
  if (semIndice) {
    const el = doc.createElement('meta');
    el.name = 'robots';
    el.content = semSeguimento ? 'noindex, nofollow' : 'noindex';
    doc.head.appendChild(el);
  }
}

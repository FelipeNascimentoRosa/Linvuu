import type { Graph, Thing, WithContext } from 'schema-dts';

/** Dados estruturados tipados, serializados com escape para incorporação segura no HTML. */
export function JsonLd({ dados }: { dados: Graph | WithContext<Thing> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dados).replace(/</g, '\\u003c') }} />;
}

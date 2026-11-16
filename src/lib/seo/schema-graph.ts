import { REDES } from '../../config/social.ts';
import { emailOficial } from '../../config/site.ts';
import type { EducationalOrganization, Graph, Person } from 'schema-dts';

/** Identificadores absolutos persistentes, compartilhados pelos dois domínios. */
export const ORGANIZATION_ID = 'https://linvuu.com.br/#organization';
export const AUTHOR_ID = 'https://linvuu.com.br/#author';

export function grafoInstitucional(): Graph {
  const organization: EducationalOrganization = {
    '@type': 'EducationalOrganization', '@id': ORGANIZATION_ID,
    name: 'Linvuu', url: 'https://linvuu.com.br', email: emailOficial(), logo: 'https://linvuu.com.br/brand/linvuu-logo.png',
    sameAs: ['https://linvuu.com', 'https://github.com/FelipeNascimentoRosa/Linvuu', ...REDES.map((rede) => rede.url).filter(Boolean)],
    address: { '@type': 'PostalAddress', addressLocality: 'São José dos Campos', addressRegion: 'SP', addressCountry: 'BR' },
    founder: [{ '@id': AUTHOR_ID }, { '@id': 'https://linvuu.com.br/sobre#luiza' }],
  };
  const author: Person = {
    '@type': 'Person', '@id': AUTHOR_ID, name: 'Felipe Nascimento Rosa',
    jobTitle: 'Professor de idiomas e autor de material didático',
    affiliation: { '@id': ORGANIZATION_ID },
  };
  return { '@context': 'https://schema.org', '@graph': [organization, author] };
}

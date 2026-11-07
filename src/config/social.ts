// Preencha só as URLs. Enquanto estiver vazio, o ícone aparece e avisa "link em breve".
export interface Rede { id: string; nome: string; url: string }

export const REDES: Rede[] = [
  { id: 'instagram', nome: 'Instagram', url: 'https://www.instagram.com/uselinvuu/' },
  { id: 'youtube', nome: 'YouTube', url: '' },
  { id: 'tiktok', nome: 'TikTok', url: 'https://www.tiktok.com/@linvuu1' },
  { id: 'x', nome: 'X', url: '' },
  { id: 'linkedin', nome: 'LinkedIn', url: '' },
  { id: 'facebook', nome: 'Facebook', url: 'https://www.facebook.com/profile.php?id=61595187629935' },
  { id: 'telegram', nome: 'Telegram', url: '' },
  { id: 'whatsapp', nome: 'WhatsApp', url: '' },
];

/** Playlist de russo por nível, no Spotify. */
export const SPOTIFY_PLAYLIST_RU = 'https://open.spotify.com/playlist/0DbI3tfcBFSw5aeSun89b0';

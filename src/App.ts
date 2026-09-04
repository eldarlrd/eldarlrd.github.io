import '/tailwind.config.css';
import '@fontsource-variable/handjet';
import { Header } from '@/feats/Header/index.ts';

export const App = (): string => `
  ${Header()}
`;

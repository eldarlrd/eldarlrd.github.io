import '@fontsource-variable/handjet';
import '/tailwind.config.css';
import { Header } from '@/feats/Header/index.ts';

export const App = (): string => `
  ${Header()}
`;

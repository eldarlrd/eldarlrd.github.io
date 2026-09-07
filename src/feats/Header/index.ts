import { Bio } from '@/feats/Header/Bio.ts';

export const Header = (): string => `
  <header class='bg-slate-900 p-4'>
    ${Bio()}
  </header>
`;

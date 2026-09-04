import bio from '$/bio.json' with { type: 'json' };

export const Bio = (): string => `
  <section>
    <h1>${bio.name}</h1>
  </section>
`;

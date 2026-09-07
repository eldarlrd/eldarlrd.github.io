import bio from '$/bio.json' with { type: 'json' };

import '@phosphor-icons/webcomponents/PhCake';
import { getYearsSince } from '%/getYearsSince.ts';

export const Bio = (): string => {
  const birthDate = Temporal.PlainDate.from(bio.dateOfBirth);
  const yearsOld = getYearsSince(birthDate);

  return `
    <figure class='grid grid-cols-[auto_minmax(0,1fr)] gap-4 items-center-safe justify-baseline'>
      <img class='border-violet-400 size-32 border-2 aspect-square' src='https://github.com/eldarlrd.png' alt='Avatar' />
      
      <figcaption class='space-y-4'>
        <h1>
          <span class='font-medium text-slate-100'>${bio.name}</span>
          <span class='italic font-light'>aka</span>
          
          <div>
            ${bio.nickname}
            <ph-cake alt='Cake' weight='fill' size='16' class='inline-block align-middle'></ph-cake> ${yearsOld} y.o.
          </div>
        </h1>
        
        <h2>
          <span class='text-violet-400'>${bio.profession}</span>
          <div class='text-lg/6'>🇦🇿 ${bio.location}</div>
        </h2>
      </figcaption>
    </figure>
  `;
};

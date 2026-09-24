<script lang="ts">
  import { getTimeSince } from '%/getTimeSince.ts';
  import bio from '$/bio.json' with { type: 'json' };

  const birthDate = Temporal.PlainDate.from(bio.dateOfBirth);
  const { years: yearsOld, days: daysAlive } = getTimeSince(birthDate);
  const averageLifespan = 72;
</script>

<figure class="grid grid-cols-[auto_minmax(0,1fr)] items-center-safe justify-baseline gap-4">
  <img alt="Avatar" class="border-violet-400 aspect-square size-32 border-2" src={bio.avatarUrl} />

  <figcaption class="space-y-4">
    <h1>
      <span class="font-normal text-slate-50">{bio.name}</span>
      <div>
        {bio.nickname}
        <time title={'☼ ' + daysAlive.toLocaleString()}>
          <i
            class='{yearsOld > averageLifespan ? 'pixelart-icons-font-skull' : 'pixelart-icons-font-cake'} align-text-bottom text-base!'
          ></i>
          {yearsOld.toLocaleString()}
        </time>
      </div>
    </h1>

    <h2>
      <span class="text-slate-50" title={'@ ' + bio.company}>{bio.profession}</span>
      <div class="text-lg/6">
        <i class="pixelart-icons-font-map-pin-home align-text-bottom text-base!"></i>
        {bio.location}
      </div>
    </h2>
  </figcaption>
</figure>

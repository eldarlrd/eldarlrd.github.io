<script lang="ts">
  import { getYearsSince } from '%/getYearsSince.ts';
  import bio from '$/bio.json' with { type: 'json' };

  const birthDate = Temporal.PlainDate.from(bio.dateOfBirth);
  const yearsOld = getYearsSince(birthDate);
</script>

<figure class="grid grid-cols-[auto_minmax(0,1fr)] items-center-safe justify-baseline gap-4">
  <img
    alt="Avatar"
    class="border-violet-400 aspect-square size-32 border-2"
    src="https://github.com/eldarlrd.png"
  />

  <figcaption class="space-y-4">
    <h1>
      <span class="font-medium text-slate-100">{bio.name}</span>
      <span class="font-light italic">aka</span>

      <div>
        {bio.nickname}
        <i class="pixelart-icons-font-cake text-base!"></i>
        {yearsOld}
        y.o.
      </div>
    </h1>

    <h2>
      <span class="text-slate-100">{bio.profession}</span>
      <div class="text-lg/6">
        <i class="pixelart-icons-font-map-pin text-base!"></i>
        {bio.location}
      </div>
    </h2>
  </figcaption>
</figure>

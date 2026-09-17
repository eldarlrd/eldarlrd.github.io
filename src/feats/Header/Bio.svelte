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

  <figcaption class="space-y-4 select-none">
    <h1>
      <span class="font-medium text-slate-100">{bio.name}</span>

      <div>
        {bio.nickname}
        <span title="unless 🪦">
          <i class="pixelart-icons-font-cake text-base!"></i>
          {yearsOld}
        </span>
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

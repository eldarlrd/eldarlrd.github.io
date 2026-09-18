<script lang="ts">
  import bio from '$/bio.json' with { type: 'json' };
</script>

<figure class="flex items-center gap-5 sm:justify-between">
  <p class="inline-block text-sm/4" title={bio.quoteTooltip}>
    <i class="pixelart-icons-font-tea align-sub text-sm!"></i>
    {bio.quoteVerse}
  </p>

  <section aria-label="Links" class="flex items-center gap-2">
    {#each bio.socials as social (social.label)}
      <a
        aria-label={social.label}
        class="hover:text-violet-600 transition-colors active:text-violet-700"
        href={social.url}
        title={social.label}
      >
        <i aria-hidden="true" class={`${social.icon} text-base!`}></i>
        <span class="sr-only">{social.label}</span>
      </a>
    {/each}
  </section>
</figure>

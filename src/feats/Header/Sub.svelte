<script lang="ts">
  import bio from '$/bio.json' with { type: 'json' };

  const quote = bio.quotes[~~(Math.random() * bio.quotes.length)];
</script>

<figure class="flex items-center gap-5 sm:justify-between">
  <p class="inline-block text-sm/4 min-w-32 text-center" title={quote.tooltip}>
    <i class="pixelart-icons-font-{quote.icon} align-text-bottom text-sm/4!"></i>
    {quote.verse}
  </p>

  <section aria-label="Links" class="flex items-center gap-2">
    {#each bio.socials as social (social.label)}
      <a
        aria-label={social.label}
        class="hover:text-violet-400 transition-colors active:text-violet-500"
        href={social.url}
        title={social.label}
      >
        <i aria-hidden="true" class={`${social.icon} text-base!`}></i>
        <span class="sr-only">{social.label}</span>
      </a>
    {/each}
  </section>
</figure>

<script lang="ts">
  import bio from '$/bio.json' with { type: 'json' };
</script>

<figure>
  <p class="inline-block text-sm/4" title={bio.quoteTooltip}>
    <i class="pixelart-icons-font-tea align-sub text-sm!"></i>
    {bio.quoteVerse}
  </p>

  <section></section>
</figure>

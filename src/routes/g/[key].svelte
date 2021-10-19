<script context="module">
  export async function load(ctx) {
    let key = ctx.page.params.key
    return { props: { key }}
  }
</script>

<script>
  import { onMount } from 'svelte';
	import Canvas from '$lib/Canvas.svelte';
  import generator from '$lib/generator';
  let curve = [];
  let colors = [];
  let grid = [];
  export let key;
  onMount(async () => {
    ({ curve, colors, grid, key } = await generator(decodeURIComponent(key)))
  });
</script>

<svelte:head>
	<title>ellipticart - Share</title>
</svelte:head>

<section class="max-w-3xl px-8 flex flex-col items-center mx-auto">
  <div class="w-full sm:w-96 mx-auto mt-16 bg-gray-800 p-4 rounded-xl shadow-xl text-center">
    <Canvas grid={grid} colors={colors} curve={curve} />
  </div>
</section>
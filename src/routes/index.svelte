<script context="module">
	export const prerender = true;
</script>
  

<script>
	import Canvas from '$lib/Canvas.svelte';
	import ImportKey from '$lib/ImportKey.svelte';
    import generator from '$lib/generator';
    import { exportPublicKey } from '$lib/ecdsa';

    let curve = [];
    let colors = [];
    let grid = [];
    let key = null;
    let inputValue = '';

    async function loadKey(e) {
        ({ curve, colors, grid, key } = await generator(await exportPublicKey(e.detail.key)))
    }
    async function handleInput() {
        ({ curve, colors, grid, key } = await generator(inputValue))
    }
</script>

<svelte:head>
	<title>ellipticart - Home</title>
</svelte:head>

<section class="px-8 max-w-3xl flex flex-col items-center mx-auto">
    <input
        class="w-full my-8 sm:w-96 p-2 bg-gray-50 border rounded shadow"
        bind:value={inputValue}
        on:input={handleInput}
        placeholder="type something to generate..."
    />
    
    <ImportKey on:import={loadKey}> 
        {#if key}
            <Canvas grid={grid} colors={colors} curve={curve} />
        {:else}
            <svg class="fill-current" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 96 96" xml:space="preserve">
                <rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
                <g class="currentLayer">
                    <title>ellipticart</title>
                    <path d="M5.899999237060548,-7.629394538355427e-7 c-5.6,0 -5.9,5.3 -5.9,5.6 v38.9 c19.9,0 35.2,0 38.6,0 c5.6,0 5.9,-5.3 5.9,-5.6 V-7.629394538355427e-7 H5.899999237060548 zM7.099999237060544,13.599999237060544 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 c0,2.8 -2.8,5.1 -6.3,5.1 C9.99999923706055,18.699999237060545 7.099999237060544,16.39999923706055 7.099999237060544,13.599999237060544 zM32.49999923706055,30.599999237060544 c-1.5,0.9 -3.2,1.5 -5.1,2 c-1.6,0.4 -3.2,0.6000000000000001 -4.9,0.6000000000000001 c-2,0 -3.9,-0.30000000000000004 -5.8,-0.8 c-1.7000000000000002,-0.5 -3.3,-1.2 -4.7,-2 c-0.9,-0.6000000000000001 -1.1,-1.7000000000000002 -0.6000000000000001,-2.6 c0.6000000000000001,-0.9 1.7000000000000002,-1.1 2.6,-0.6000000000000001 c1.1,0.7000000000000001 2.3,1.2 3.7,1.6 c2.8,0.8 6,0.8 8.9,0.2 c1.5,-0.4 2.9,-0.9 4,-1.6 c0.9,-0.5 2,-0.2 2.6,0.6000000000000001 C33.699999237060545,28.89999923706055 33.39999923706055,30.099999237060544 32.49999923706055,30.599999237060544 zM31.89999923706055,18.699999237060545 c-3.5,0 -6.3,-2.3 -6.3,-5.1 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 C38.199999237060545,16.39999923706055 35.29999923706055,18.699999237060545 31.89999923706055,18.699999237060545 z" />
                </g>
            </svg>
        {/if}
    </ImportKey>
    {#if key}
    <div class="my-2 flex w-full sm:w-96 items-center">
        <input
            class="flex-1 p-2 bg-gray-50 border rounded shadow"
            disabled
            value={`https://www.ellipticart.com/g/${encodeURIComponent(key)}`}
        />
        <a href={`/g/${encodeURIComponent(key)}`}>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mx-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        </a>
    </div>
    {/if}
</section>

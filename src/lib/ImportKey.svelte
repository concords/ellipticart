<script>
  import { createEventDispatcher } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { importPrivateKeyFromPem } from './ecdsa';

	const dispatch = createEventDispatcher();
  let showModal = false;

  async function onLoadFileHandler(e) {
    try {
      const key = await importPrivateKeyFromPem(e.target.result)
      dispatch('import', { key });
    } catch (e) {
      showModal = true;
    }
  }

  function importKey(event) {
    let input = event.target;
    if (!input.files)
        throw ("This browser does not support the `files` property of the file input.");
    if (!input.files[0])
        return undefined;
    const file = input.files[0];
    let fr = new FileReader();
    fr.onload = onLoadFileHandler;
    fr.readAsText(file);
  }
</script>

<div class="w-full sm:w-96 mx-auto bg-gray-800 p-4 rounded-xl shadow-xl text-center">
  <label class="relative group text-gray-900 hover:text-gray-700 block hover:opacity-80 transition-all transition-opacity duration-500 cursor-pointer">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-gray-50 transition-opacity duration-200 px-5 py-2 rounded shadow-xl">Upload Key</div>
    <slot/>
    <input type="file" class="hidden" on:change={importKey} />
  </label>
</div>
{#if showModal}
<div
  on:click|self={() => showModal = false}
  class="fixed p-4 flex bg-gray-900 bg-opacity-50 justify-center items-center top-0 left-0 w-screen h-screen"
  transition:fade="{{ duration: 200 }}"
>
  <div
    class="bg-white rounded shadow-xl p-8 text-center"
    transition:fly="{{ y: 200, duration: 300 }}"
  >
    <p class="text-red-600 font-bold">Unsupported File Type</p>
    <p class="py-12">
      Grab your key from <a href="https://www.concords.app/identity">concords.app/identity</a>
    </p>
    <svg class="fill-current w-12 h-12 mx-auto mt-4 text-gray-700" viewBox="0 0 45 45" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" enable-background="new 0 0 96 96" xml:space="preserve">
      <rect id="backgroundrect" width="100%" height="100%" x="0" y="0" fill="none" stroke="none"/>
      <g class="currentLayer">
          <title>ellipticart</title>
          <path d="M5.899999237060548,-7.629394538355427e-7 c-5.6,0 -5.9,5.3 -5.9,5.6 v38.9 c19.9,0 35.2,0 38.6,0 c5.6,0 5.9,-5.3 5.9,-5.6 V-7.629394538355427e-7 H5.899999237060548 zM7.099999237060544,13.599999237060544 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 c0,2.8 -2.8,5.1 -6.3,5.1 C9.99999923706055,18.699999237060545 7.099999237060544,16.39999923706055 7.099999237060544,13.599999237060544 zM32.49999923706055,30.599999237060544 c-1.5,0.9 -3.2,1.5 -5.1,2 c-1.6,0.4 -3.2,0.6000000000000001 -4.9,0.6000000000000001 c-2,0 -3.9,-0.30000000000000004 -5.8,-0.8 c-1.7000000000000002,-0.5 -3.3,-1.2 -4.7,-2 c-0.9,-0.6000000000000001 -1.1,-1.7000000000000002 -0.6000000000000001,-2.6 c0.6000000000000001,-0.9 1.7000000000000002,-1.1 2.6,-0.6000000000000001 c1.1,0.7000000000000001 2.3,1.2 3.7,1.6 c2.8,0.8 6,0.8 8.9,0.2 c1.5,-0.4 2.9,-0.9 4,-1.6 c0.9,-0.5 2,-0.2 2.6,0.6000000000000001 C33.699999237060545,28.89999923706055 33.39999923706055,30.099999237060544 32.49999923706055,30.599999237060544 zM31.89999923706055,18.699999237060545 c-3.5,0 -6.3,-2.3 -6.3,-5.1 c0,0 1.9,2.1 6.4,2.1 s6.3,-2.1 6.3,-2.1 C38.199999237060545,16.39999923706055 35.29999923706055,18.699999237060545 31.89999923706055,18.699999237060545 z" />
      </g>
    </svg>
  </div>
</div>
{/if}
<script>
  import { createEventDispatcher } from 'svelte';
  import { importPrivateKeyFromPem } from './ecdsa';
  import logo from '$lib/header/concord-logo.svg';

	const dispatch = createEventDispatcher();

  async function onLoadFileHandler(e) {
    const key = await importPrivateKeyFromPem(e.target.result)
    dispatch('import', { key });
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

<div class="w-96 mx-auto mt-16 bg-gray-800 p-4 rounded-xl shadow-xl text-center">
  <label class="relative group text-gray-900 hover:text-gray-700 block hover:opacity-80 transition-all transition-opacity duration-500 cursor-pointer">
    <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-gray-900 text-gray-50 transition-opacity duration-200 px-5 py-2 rounded shadow-xl">Upload Key</div>
    <slot/>
    <input type="file" class="hidden" on:change={importKey} />
  </label>
</div>
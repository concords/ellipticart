<script context="module">
	export const prerender = true;
</script>

<script>
  let disableAnalytics = Boolean(window.localStorage.getItem('disableAnalytics'));

  $: {
    window.localStorage.setItem('disableAnalytics', disableAnalytics);
    window['ga-disable-UA-XXXXX-Y'] = disableAnalytics;
  }

</script>
<section class="px-4">
  <h1 class="text-6xl text-center my-12 font-black">Privacy Policy</h1>
  <section class="my-8 mx-auto w-full max-w-5xl">
    <p class="text-sec-text text-lg ">This privacy policy sets out how <strong>Ellipticart.com</strong> uses and protects any information that you give the parent company <strong>Team Concords Limited</strong>company when you use this website or enquire about our services.</p>
  </section>
  <section class="my-8 mx-auto w-full max-w-5xl">
    <h2 class="text-4xl my-4">Analytics</h2>
    <p class="text-lg text-sec-text">A record is made, each time you visit https://www.ellipticart.com. The data held within this record includes your anonymised IP address and no personally identifiable data.  This data is used anonymously to provide us with statistics on our website traffic, including but not limited to who visits the site and the most frequently visited pages on our site. These statistics allow us to monitor the site and update and maintain content.</p>
    <p class="text-lg text-sec-text">Google Analytics are used to gather this unidentifiable data and use browser cookies to identify page visits and session infomation.</p>
    <p class="text-lg text-sec-text">You may opt-out of analytics here.</p>
    <p class="text-lg text-sec-text">Disable Google analytics on this site <input type="checkbox" bind:value={disableAnalytics} /> </p>
  </section>
</section>
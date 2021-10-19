<script context="module">
	export const prerender = true;
</script>

<script>
  import { browser } from '$app/env';

  let disableAnalytics;

  if (browser) {
    disableAnalytics = JSON.parse(window.localStorage.getItem('disableAnalytics'));
  }

  function toggleAnalytics(e) {
    if (browser) {
      window.localStorage.setItem('disableAnalytics', e.target.checked);
      window['ga-disable-G-7ZJC580685'] = e.target.checked;
    }
  }

</script>
<section class="px-4">
  <h1 class="text-6xl text-center my-12 font-black">Privacy Policy</h1>
  <section class="my-8 mx-auto w-full max-w-5xl">
    <p class="text-sec-text text-lg ">This privacy policy sets out how <strong>Ellipticart.com</strong> uses and protects any information that you give the parent company <strong>Team Concords Limited</strong> company when you use this website or enquire about our services.</p>
  </section>
  <section class="my-8 mx-auto w-full max-w-5xl">
    <h2 class="text-4xl my-4">Analytics</h2>
    <p class="text-lg text-sec-text my-2">A record is made, each time you visit https://www.ellipticart.com. The data held within this record includes your anonymised IP address and no personally identifiable data.  This data is used anonymously to provide us with statistics on our website traffic, including but not limited to who visits the site and the most frequently visited pages on our site. These statistics allow us to monitor the site and update and maintain content. This website uses non-identifying cookies to track analytics.</p>
    <p class="text-lg text-sec-text my-4">Disable Google analytics on this site <input type="checkbox" checked={disableAnalytics} on:change={toggleAnalytics} /> </p>
  </section>
</section>
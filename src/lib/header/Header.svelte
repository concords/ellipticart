<script>
	import { page } from '$app/stores';
	import concords from './concord-logo.svg';
	import github from './github-logo.svg';
</script>

<header>
	<div class="corner">
		<a href="/">
			<img src={concords} alt="ellipticart - Home" />
		</a>
	</div>

	<h1 class="text-sm tracking-widest my-4 font-black">ellipticart.</h1>

	<div class="corner">
		<a href="https://www.github.com/concords/ellipticart">
			<img src={github} alt="Github - concords/ellipticart" />
		</a>
	</div>
</header>

<style>
	header {
		display: flex;
		justify-content: space-between;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 	2em;
		height: 2em;
		object-fit: contain;
	}
</style>

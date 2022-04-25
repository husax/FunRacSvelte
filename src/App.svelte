<script lang="ts">
//	export let name: string;
import Cabeza  from './components/Cabeza.svelte';
import Cuerpo from './components/Cuerpo.svelte';
import { Styles } from 'sveltestrap';
</script>

<Styles />
<!--
<svelte:head>
  <link rel="stylesheet" href="../src/tools/mathquill.css"/>
	<script src="../src/tools/jquery-3.5.1.min.js"></script>
  <script src="../src/tools/mathquill.js"></script>
</svelte:head>
-->
<div>
  <Cabeza />
	<Cuerpo />
</div>

<style>
/*
	h1 {
		color: #ff3e00;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
*/
</style>
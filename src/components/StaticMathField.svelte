<script>
  import { onMount } from 'svelte';
  import { StaticMath } from '../../public/cajaMq.js';

  export let latex;
  let caja;
  let staticfield;
  
  onMount( () => {
    staticfield= StaticMath(caja);
  });
</script>

<span bind:this={caja}>{latex}</span>

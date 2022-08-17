<script>
  import { onMount } from 'svelte';
  import { StaticMath } from '../../public/cajaMq.js';

  export let latex;
  //export let hidden;
  let caja;
  
  onMount( () => {
    StaticMath(caja);
  });
</script>

<span bind:this={caja}>{latex}</span>

<style>
  span {
    border-color: red;
    border-radius: 2px;
    font-size: 1.1rem;
  }
  </style>

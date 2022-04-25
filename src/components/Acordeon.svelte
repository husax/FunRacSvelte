<script>
import { Accordion, AccordionItem } from 'sveltestrap';
import CajaDeriv from './CajaDeriv.svelte';
export let items;
export let ActualizaGraf;
export let muestra=true;
export let grafDer;
export let animaRectaTang;
export let muestraRectaTang;
</script>

<Accordion class="acordeon">
  {#if muestra}
    {#each items as item, ind }
      <AccordionItem on:toggle={
        (e) => {
          if (e.detail) {
            ActualizaGraf(ind);
          }
        }
      } >
        <h4 class="m-0" slot="header">{item.titulo}</h4>
        {#if ind === 1}
        <CajaDeriv latex={item.contenido} {grafDer} {muestraRectaTang} {animaRectaTang}/>
        {:else}
          {item.contenido}
        {/if}
      </AccordionItem>
    {/each}
  {/if}
</Accordion>
<style>
  h4 {
    font-size: 1.2em;
    font-weight: bold;
  }
  
</style>
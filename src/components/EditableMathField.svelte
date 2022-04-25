<script>
import { onMount } from 'svelte';
import {MField} from '../../public/cajaMq.js';
import { idRaices, latexFun, muestra} from '../tools/Almacen.js';

export let latex;
export let config;
export let onkeydown;
let caja;
let mathfield;

config.handlers= {
  edit: () => {
    latexFun.update(() => mathfield.latex());
    $muestra=false;
    $idRaices=[];
  }
}

onMount( () => {

  mathfield= MField(caja, config);
  mathfield.latex(latex);
  latexFun.set(mathfield.latex());

});


</script>

<span bind:this={caja} on:keydown={onkeydown}>No abrió Mathquill</span>

<style>
  span {
    border-color: red;
    border-radius: 2px;
    font-size: 1.3rem;
  }
  </style>
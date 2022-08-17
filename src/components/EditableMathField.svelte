<script>
import { onMount } from 'svelte';
import { MField } from '../../public/cajaMq.js';
import { latexFun } from '../tools/Almacen.js';



export let latex;
export let config;
export let disabled;
let caja;
let mathfield;
export function focus() {
  mathfield.focus();
  console.log("¿obtuvo el foco?");
}

function filtro(e) {
    const teclasEsp = [
      "ArrowLeft",
      "ArrowRight",
      "ArrowUp",
      "ArrowDown",
      "Delete",
      "Enter",
      "Insert",
      "Backspace",
      "Home",
      "End",
    ];
    const caracAcep = "0123456789x+-/*()=.sqrtpi";
    if (teclasEsp.indexOf(e.key) !== -1 || caracAcep.indexOf(e.key) !== -1) {
      return;
    }
    // impide que se realice la acción por defecto del evento
    e.preventDefault();
  }
  

config.handlers= {
  edit: () => {
    latexFun.update(() => mathfield.latex());
    }
}

onMount( () => {

  mathfield= MField(caja, config);
  mathfield.latex(latex);
  latexFun.set(mathfield.latex());

});


</script>
<span bind:this={caja} on:keydown={filtro} hidden={disabled}>No abrió Mathquill</span>
<style>
  span {
    border-color: red;
    border-radius: 2px;
    font-size: 1.3rem;
  }
  </style>
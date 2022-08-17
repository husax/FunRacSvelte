<script>
  import { InputGroup, InputGroupText, Button } from "sveltestrap";
  import EditableMathField from "./EditableMathField.svelte";
  import StaticMathField from "./StaticMathField.svelte";
  import {muestra } from "../tools/Almacen.js";
  export let latex;
  let cajamat;
  export function focus() {
    cajamat.focus();
  }
  export let disabled;

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
</script>

<InputGroup size="lg" class="mb-3" >
  <InputGroupText id="basic-addon1">P(x) =</InputGroupText>
  {#if disabled}
    <StaticMathField latex={latex}/>
  {/if}
  <EditableMathField bind:this={cajamat} 
    {latex}
    config={{
      charsThatBreakOutOfSupSub: "+-()",
      autoCommands: "pi sqrt",
    }}
    {disabled}
  />
  <Button color={"success"} size="sm" on:click>
    {$muestra ? "Cambia función" : "Aceptar"}
  </Button>
</InputGroup>

<style>
</style>

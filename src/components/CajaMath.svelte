<script>
  import { InputGroup, InputGroupText, Button } from 'sveltestrap';
  import EditableMathField from './EditableMathField.svelte';
  import {latexFun} from '../tools/Almacen.js';
  export let latex;
  let caja;

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

<InputGroup size="lg" class="mb-3">
  <InputGroupText id="basic-addon1">P(x) =</InputGroupText>
  <EditableMathField 
    latex={latex}
    config={{
      charsThatBreakOutOfSupSub: "+-()",
      autoCommands: "pi sqrt",
    }}
    onkeydown={(event) => filtro(event)}
  />
    <Button color={"success"} size="md" on:click>
      Aceptar
    </Button>
</InputGroup>

<style>
  
</style>

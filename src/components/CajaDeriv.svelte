<script>
  import { Button, ListGroup, ListGroupItem } from "sveltestrap";
  import { marcado, marcadoT } from "../tools/Almacen";
  import StaticMathField from "./StaticMathField.svelte";

  export let latex;
  export let grafDer;
  export let animaRectaTang;
  export let muestraRectaTang;
  //export let checked;
</script>

<div class="cajaAc">
  <!--
  <span>P'(x) = </span>  -->
  <StaticMathField {latex} />
  <ListGroup class="list-group-horizontal">
    <ListGroupItem>
      <input
        type="checkbox"
        name="grafica"
        on:change={grafDer}
        checked={$marcado}
      />
      <label for="grafica">Ver gráfica</label>
    </ListGroupItem>
    <ListGroupItem>
      <input type="checkbox" name="tangente" on:change={muestraRectaTang} />
      <label for="tangente">Ver Recta Tangente</label>
      <Button color={"success"} size="md" on:click={animaRectaTang}>
        Anima Recta Tangente
      </Button>
    </ListGroupItem>
  </ListGroup>
</div>

<style>
  .cajaAc {
    margin-top: 0px;
    margin-bottom: 0px;
    padding-top: 0px;
    padding-bottom: 0px;
    overflow-x: auto;
  }
</style>

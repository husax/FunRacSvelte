<script>
  import { Button, ListGroup, ListGroupItem } from "sveltestrap";
  import { brd, funRac, idFuns, idObjs, reqid } from "../tools/Almacen";
  import { AgregaGrafica, BorraRectaTang, BorraGrafDer, MuestraRT } from "../tools/TrazosJSXGraph";
  import StaticMathField from "./StaticMathField.svelte";

  export let latex;
  export let animaRectaTang;
  let siGraf;
  let siRectaTan=false;
  let iniciaVerTan="Anima Tangente";

  const GrafDer = () => {
    let paramFunc = {
      func: (x) => $funRac.Derivada().Evalua(x),
      name: "P'",
      color: "red",
      idFuns: $idFuns,
    };
    idFuns.update(() => AgregaGrafica($brd, paramFunc));
  };

  const GrafDerONo = () => {
    if (siGraf) {
      GrafDer();
    } else {
      BorraGrafDer();
    }
  }

  const muestraRectaTang = () => {
    let param = {
      func: $idFuns[0],
      deriv: (x) => $funRac.Derivada().Evalua(x),
      color: "blue",
      idObjs: $idObjs,
    };
    idObjs.update(() => MuestraRT($brd, param));
  };


  const GrafTangONo = () => {
    if (siRectaTan) {
      muestraRectaTang();
    } else {
      BorraRectaTang();
    }
  };

</script>

<div class="cajaAc">
  <!--
  <span>P'(x) = </span>  -->
  <StaticMathField {latex}/>
  <ListGroup class="list-group-horizontal">
    <ListGroupItem>
      <input type="checkbox" name="grafica" bind:checked={siGraf}
        on:change={GrafDerONo}/>
      <label for="grafica">Ver gráfica</label>
    </ListGroupItem>
    <ListGroupItem>
      <input type="checkbox" name="tangente" bind:checked={siRectaTan} 
        on:change={GrafTangONo} />
      <label for="tangente">Ver Tangente</label>
      <Button
        color={"success"}
        size="sm"
        disabled={!siRectaTan}
        on:click={() => {
          if ($reqid === 0) {
            animaRectaTang();
            iniciaVerTan="Deten Anima Tangente";
          }
          else {
            window.cancelAnimationFrame($reqid);
            iniciaVerTan="Anima Tangente";
            reqid.set(0);
          }
        }}
      >
        {$reqid !== 0 ? "Deten Anima Tangente" : "Anima Tangente"} <!--  {iniciaVerTan} -->
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

<script>
  import {
    brd,
    funRac,
    latexFun,
    muestra,
    idRaices,
    idObjs,
    idFuns,
    reqid
  } from "../tools/Almacen";
  import { Col, Container, Row, Button } from "sveltestrap";
  import CajaMath from "./CajaMath.svelte";
  import MsgModal from "./MsgModal.svelte";
  import JXGBoard from "./JsxBoard.svelte";
  import Acordeon from "./Acordeon.svelte";
  
  import TeXToLinealPyt from "../tools/TeXToLineal";
  import InfijaAPolaca from "../tools/InfAPolInvCls";
  import {
    ArrNum,
    ArrNumToString,
    cadBul,
    calcExtremos,
  } from "../tools/ConvierteData";
  import {
    GraficaNueva,
    GraficaRaices,
    BorraGrafDer,
    BorraRectaTang,
    AnimaRT,
  } from "../tools/TrazosJSXGraph";
  import { items } from "../tools/datosItems";

  let latex = "\\frac{x^3-3x+1}{x^2-4}";
  let msg = "";
  let disabled=false;

  let datosSympy = {};

  let open = false;
  let boardAttributes = {
    axis: true,
    boundingbox: [-20, 10, 10, -15],
  };
  let paramFunc = {
    func: null,
    name: "",
    color: "",
    raices: [],
    traza: false,
    idFuns: [],
    idRaices: [],
  };

  let caja;

  const handleClick = () => {
    if (!$muestra) {
      console.log($latexFun);
      Acepta();
      // if ($reqid !== 0) {
      //   window.cancelAnimationFrame($reqid);
      //   reqid.update(() => 0);
      // }
      console.log("reqid vale " + $reqid);
      caja.focus();
    } else {
      BorraRectaTang();
      BorraGrafDer();
      console.log("reqid vale antes" + $reqid);
      if ($reqid !== 0) {
        window.cancelAnimationFrame($reqid);
        reqid.update(() => 0);
      }
      console.log("reqid vale " + $reqid);
    }
    muestra.update((valor) => !valor);
    disabled=!disabled;
  };

  const ChecaHuecos = (cad) => {
    let reg = /\*\*\(\)/g;
    if (cad.match(reg) !== null) {
      return "Hay una casilla de exponente vacia";
    }
    reg = /\/\(\)/;
    if (cad.match(reg) !== null) {
      return "Hay un cociente indicado pero falta el denominador";
    }
    reg = /\(\)\//;
    if (cad.match(reg) !== null) {
      return "Hay un cociente indicado pero falta el numerador";
    }
    return "";
  };

  function toggle() {
    open = !open;
  }

  function Acepta() {
    console.log($latexFun);
    let cadFun = $latexFun;
    latexFun.subscribe(valor => latex= valor);
    let cadpyt = TeXToLinealPyt.TexToPyt(cadFun, true);
    let cad = TeXToLinealPyt.TexToPyt(cadFun, false);
    let cadFunRac;
    let ventanaY;
    msg = ChecaHuecos(cadpyt);
    if (msg !== "") {
      open = !open;
      return;
    }
    let procesaInfija = new InfijaAPolaca(cad);
    procesaInfija.InfAPol();
    if (procesaInfija.numError !== 0) {
      open = !open;
      msg = InfijaAPolaca.errores[-procesaInfija.numError];
      return;
    }
    funRac.set(procesaInfija.EvalFuncRac(procesaInfija.postFija));
    if ($funRac.esPolinomio) {
      cadFunRac = $funRac.toString();
    } else {
      cadFunRac = $funRac.numP.toString() + "," + $funRac.denomP.toString();
    }
    const url =
      "http://127.0.0.1:5000/api/v1/polynomial/properties/" + cadFunRac;
    const respPromesa = fetch(url, { method: "GET" });
    respPromesa.then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
        return;
      }
      response.json().then((data) => {
        data.racional = cadBul(data.racional);
        data.rfun = ArrNum(data.raices.rfun);
        data.rder1 = ArrNum(data.raices.rder1);
        data.rder2 = ArrNum(data.raices.rder2);
        if (data.racional) {
          data.remov = ArrNum(data.remov);
        }
        data.ventanaX = ArrNum(data.ventanaX);
        console.log(data);
        console.log(data.derivada.latex);
        data.derivada.latex = "P'\\left(x\\right)=" + data.derivada.latex;
        ventanaY = calcExtremos((x) => $funRac.Evalua(x), data.rder1);
        boardAttributes = {
          axis: true,
          boundingbox: [
            data.ventanaX[0],
            ventanaY[1] * 1.1,
            data.ventanaX[1],
            ventanaY[0] * 1.1,
          ],
        };
        paramFunc.func = (x) => $funRac.Evalua(x);
        paramFunc.name = "P";
        paramFunc.color = "green";
        paramFunc.idFuns = $idFuns;
        idFuns.set(GraficaNueva($brd, paramFunc));
        datosSympy = data;
        if (datosSympy.hasOwnProperty("rfun")) {
          items[0].contenido = ArrNumToString(datosSympy.rfun, 3);
          paramFunc.raices = datosSympy.rfun;
          paramFunc.idRaices = [];
        }
        if (datosSympy.hasOwnProperty("derivada")) {
          items[1].contenido = datosSympy.derivada.latex;
        }
      });
    });
  }

  InfijaAPolaca.IniciaErrores();

  const ActualizaGraf = (item) => {
    console.log(item);
    if (item === 0 && datosSympy.hasOwnProperty("rfun")) {
      if (paramFunc.raices.length === 0) {
        $idRaices = [];
        return;
      }
      $idRaices = GraficaRaices($brd, paramFunc);
    } else if (item === 1) {
      BorraGrafDer();
      BorraRectaTang();
    }
  };

  const animaRectaTang = () => {
    let param = {
      func: $idFuns[0],
      deriv: (x) => funRac.Derivada().Evalua(x),
      vxmin: datosSympy.ventanaX[0],
      vxmax: datosSympy.ventanaX[1],
      color: "blue",
      idObjs: $idObjs,
    };
    AnimaRT($brd, param);
  };

  
</script>

<Container fluid>
  <MsgModal {open} {msg} on:cierra={toggle} />
  <Row>
    <Col sm={4}>
      <CajaMath {latex} {disabled} on:click={handleClick} bind:this={caja}/>
      <Acordeon
        {items}
        {ActualizaGraf}
        muestra={$muestra}
        {animaRectaTang}
      />
    </Col>
    <Col sm={8}>
      <JXGBoard {boardAttributes} />
    </Col>
  </Row>
</Container>

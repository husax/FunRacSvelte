<script lang="ts">
  import { Col, Container, Image, Row } from 'sveltestrap';
  import BarraNav from './BarraNav.svelte';
  import CajaMath from './CajaMath.svelte';
  let logoImg= './logo.jpg';
  let latex= '\\frac{x^3-3x+1}{x^2-4}';
  let handleClick= () => {alert('listo para responder');};
</script>

<Container fluid>
  <Row class="bg-light justify-content-between">
    <Col md="4"> 
      <Image src={logoImg} alt="logo"/>
    </Col>
    <Col md="4" class="align-self-center font-italic">
      <h2 class="cinves-color">   
        CalcVisual Web
      </h2>
    </Col>
    <Col md="4"> 
      <Image src={logoImg} alt="logo"/>
    </Col>
  </Row>
  <Row>
    <Col> 
      <BarraNav />
    </Col>
  </Row>
  <!--
  <Row>
    <Col md=4>
      <CajaMath latex={latex} on:click={handleClick} />
    </Col>
  </Row>
  -->
</Container>

<style>
  .cinves-color {
    color: rgb(9, 122, 9);
  }
</style>

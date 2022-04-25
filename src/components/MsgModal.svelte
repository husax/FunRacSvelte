<script>
import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
  } from 'sveltestrap';
import { createEventDispatcher } from 'svelte';

export let open;
export let msg;
const toggle= () => (open = !open);

const dispatch = createEventDispatcher()

function Cierra() {
  toggle();
  dispatch('cierra', {
    valor: false
  })
}

</script>

<Modal isOpen={open} backdrop={false} {toggle}>
  <ModalHeader class="bg-danger" closeButton>
    Expresión inválida
  </ModalHeader>
  <ModalBody>{msg}</ModalBody>
  <ModalFooter>
    <Button variant="danger" on:click={Cierra}>
      Cerrar
    </Button>
  </ModalFooter>
</Modal>
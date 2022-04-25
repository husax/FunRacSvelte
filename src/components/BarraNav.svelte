<script lang="ts">
import { Styles }  from 'sveltestrap';
import {
  Collapse, 
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'sveltestrap';

let isOpen = false;

const toggle= () => (isOpen = !isOpen);

function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }

</script>

<Navbar class="navbar-dark bg-dark navbar-expand-lg">
  <NavbarBrand href="#home" class="text-white">
    Funciones Algebraicas:
  </NavbarBrand>
  <NavbarToggler on:click={toggle} class="me-2"  />
  <Collapse {isOpen} navbar expand="lg" on:update={handleUpdate}>
    <Nav  class="ms-auto text-light" navbar>
      <NavItem>
        <NavLink href="#Home">Inicio</NavLink>
      </NavItem>
      <Dropdown title="Funciones" nav inNavbar>
        <DropdownToggle nav caret>Funciones</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem href="#action/3.1">
            Polinomiales
          </DropdownItem>
          <DropdownItem href="#action/3.2">
            Racionales
          </DropdownItem>
          <DropdownItem href="#action/3.3">
            Radicales
          </DropdownItem>
          <DropdownItem divider/>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>


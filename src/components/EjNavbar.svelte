<script lang="ts">
  import { Styles } from 'sveltestrap';
  import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
  } from 'sveltestrap';

  let isOpen = false;

  function handleUpdate(event) {
    isOpen = event.detail.isOpen;
  }
</script>

<Navbar color="light" light expand="md">
  <NavbarBrand href="/">sveltestrap</NavbarBrand>
  <NavbarToggler on:click={() => (isOpen = !isOpen)} />
  <Collapse {isOpen} navbar expand="md" on:update={handleUpdate}>
    <Nav class="ms-auto" navbar>
      <NavItem>
        <NavLink href="#components/">Components</NavLink>
      </NavItem>
      <NavItem>
        <NavLink href="https://github.com/bestguy/sveltestrap">GitHub</NavLink>
      </NavItem>
      <Dropdown nav inNavbar>
        <DropdownToggle nav caret>Options</DropdownToggle>
        <DropdownMenu end>
          <DropdownItem>Option 1</DropdownItem>
          <DropdownItem>Option 2</DropdownItem>
          <DropdownItem divider />
          <DropdownItem>Reset</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </Nav>
  </Collapse>
</Navbar>
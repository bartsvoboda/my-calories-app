import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import {Navbar, Nav, NavDropdown, Form, Button} from 'react-bootstrap';

export default class NavbarMenu extends Component{
   constructor(props){
      super(props);

      this.submitLogout = this.submitLogout.bind(this);
   }

   submitLogout(e){
      localStorage.removeItem('jwt-token');
   }

    render() {
        return (
            <>
            <Navbar bg="dark" variant="dark">
              <Link to = '/user/status' className="navbar-brand"> Status</Link>            
              <Nav className="mr-auto">
              <NavDropdown title="Mój profil" id="basic-nav-dropdown">
                 <NavDropdown.Item href="/user/data/"> Moje Dane </NavDropdown.Item>
                 <NavDropdown.Item href="/user/edit"> Edytuj Dane</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item href="/user/delete/:id"> Usuń konto</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Jedzenie" id="basic-nav-dropdown">
                 <NavDropdown.Item href="/food/diary/:id"> Pokaż dziennik </NavDropdown.Item>
                 <NavDropdown.Item href="/food/diary/add/:id"> Dodaj jedzenie</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/exercise/diary/add/:id">+ Ćwiczenia</Nav.Link>
              <Nav.Link href="/diary">Dziennik</Nav.Link>
              </Nav>
              <Form inline>
                  <Button variant="primary" href="/" onClick={this.submitLogout}>Wyloguj</Button>
               </Form>
            </Navbar>
            </>
        );
    }
}
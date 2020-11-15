import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';

export default class NavbarMenu extends Component{

    render() {
        return (
            <>
            <Navbar bg="dark" variant="dark" navbar-expang-lg>
              <Link to = '/user/status' className="navbar-brand"> Status</Link>            
              <Nav className="mr-auto">
              <NavDropdown title="Mój profil" id="basic-nav-dropdown">
                 <NavDropdown.Item href="#action/3.1"> Moje Dane </NavDropdown.Item>
                 <NavDropdown.Item href="#action/3.2"> Edytuj Dane</NavDropdown.Item>
                 <NavDropdown.Item href="#action/3.3"> Zmień hasło</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item href="#action/3.4"> Usuń konto</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Jedzenie" id="basic-nav-dropdown">
                 <NavDropdown.Item href="#action/3.1"> Pokaż dziennik </NavDropdown.Item>
                 <NavDropdown.Item href="#action/3.2"> Dodaj jedzenie</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="Ćwiczenia" id="basic-nav-dropdown">
                 <NavDropdown.Item href="#action/3.1"> Pokaż dziennik </NavDropdown.Item>
                 <NavDropdown.Item href="#action/3.2"> Dodaj Ćwiczenia</NavDropdown.Item>
              </NavDropdown>
              </Nav>
              <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
              </Form>
            </Navbar>
            </>
        );
    }
}
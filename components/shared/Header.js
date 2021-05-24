import React, { useState } from 'react';
import Link from "next/link";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem
} from 'reactstrap';

const BsNavLink = props => {
  const { href, title } = props;
  return (
    <Link href={href}>
      <a className="nav-link port-navbar-link">{title}</a>
    </Link>
  )
}

const LoginLink = () => 
  <BsNavLink href="/api/auth/login" title="Login" />
  //<a className="nav-link port-navbar-link" href="/api/v1/login">Login</a>
  //<BsNavLink href="/api/v1/login" title="Login" />

const LogoutLink = () => 
  <BsNavLink href="/api/auth/logout" title="Logout" />
  //<span className="nav-link port-navbar-link clickable">Logout</span>

const Header = ({user, loading}) => {
  const [isOpen, setIsOpen ] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  return (
    <div>
      <Navbar
        className="port-navbar port-default absolute"
        color="transparent"
        dark
        expand="md">
        <div className="navbar-brand">
          <Link href="/">
            <a className="port-navbar-brand">marinalan</a>
          </Link>
        </div>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/" title="Home" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/about" title="About" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/portfolios" title="Portfolios" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/blogs" title="Blogs" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/cv" title="Cv" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/secret" title="Secret" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/secretssr" title="SecretSSR" />
            </NavItem>
            <NavItem className="port-navbar-item">
              <BsNavLink href="/onlyadmin" title="Admin" />
            </NavItem>
          </Nav>
          <Nav navbar>
            { !loading && 
              <>
                { user && 
                  <NavItem className="port-navbar-item">
                    <LogoutLink />
                  </NavItem>
                }
                { !user &&
                  <NavItem className="port-navbar-item">
                    <LoginLink />
                  </NavItem>
                }
              </>
            }
          </Nav>
        </Collapse>
      </Navbar>
    </div>
  )
}

export default Header;
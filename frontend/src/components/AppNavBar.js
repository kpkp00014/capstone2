import React, { Fragment, useCallback, useEffect, useState } from "react";
import {
  Button,
  Collapse,
  Container,
  Form,
  Nav,
  Navbar,
  NavbarToggler,
  NavItem,
} from "reactstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CURRENT_PROJECT_CLEAR_REQUEST, LOGOUT_REQUEST } from "../redux/types";
import LoginModal from "./auth/LoginModal";
import RegisterModal from "./auth/registerModal";

const AppNavBar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  // user data에 변화(login, logout)가 있을 시, isopen = false
  useEffect(() => {
    setIsOpen(false);
  }, [user]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const falseTogle = () => {
    setIsOpen(false);
    dispatch({
      type: CURRENT_PROJECT_CLEAR_REQUEST,
    });
  };

  const authLink = (
    <Fragment>
      <NavItem className="d-flex justify-content-center">
        <Form className="col ">
          <Link to="/project" onClick={falseTogle}>
            <Button color="primary" className="mt-2 px-3" block>
              Project
            </Button>
          </Link>
        </Form>
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col">
          <Link to="/storage" onClick={falseTogle}>
            <Button color="info" className="mt-2  px-3" block>
              Storage
            </Button>
          </Link>
        </Form>
      </NavItem>
      <NavItem className="d-flex justify-content-center">
        <Form className="col mt-2">
          {user && user.name ? (
            <Link to="#">
              <Button outline color="light" className="px-3" block>
                <strong>{user ? `Welcome ${user.name}` : ""}</strong>
              </Button>
            </Link>
          ) : (
            <Button outline color="light" className="px-3" block>
              <strong>Can't Find User</strong>
            </Button>
          )}
        </Form>
      </NavItem>
      <NavItem>
        <Form className="col">
          <Link onClick={onLogout} to="/">
            <Button outline color="light" className="mt-2" block>
              Logout
            </Button>
          </Link>
        </Form>
      </NavItem>
    </Fragment>
  );
  const guestLink = (
    <Fragment>
      <NavItem>
        <LoginModal />
      </NavItem>
      <NavItem>
        <RegisterModal />
      </NavItem>
    </Fragment>
  );
  return (
    <Fragment>
      <Navbar color="dark" dark expand="lg" className="sticky-top">
        <Container>
          <Link to="/" className="text-white text-decoration-none">
            Video-Scroll-Capture
          </Link>
          <NavbarToggler onClick={handleToggle} />
          <Collapse isOpen={isOpen} navbar>
            <Nav className="ml-auto d-flex justify-content-around" navbar>
              {isAuthenticated ? authLink : guestLink}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
    </Fragment>
  );
};

export default AppNavBar;

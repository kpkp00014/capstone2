import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { Container } from "reactstrap";
import AppNavBar from "../components/AppNavBar";
import Footer from "../components/Footer";

import MainPage from "./normalRoute/MainPage";
import ProjectPage from "./projectRoute/ProjectPage";
import StoragePage from "./storageRoute/StoragePage";

const MyRouter = () => (
  <Fragment>
    <AppNavBar />
    <Container id="main-body">
      <Route path="/" exact component={MainPage} />

      <Route path="/project" exact component={ProjectPage} />

      <Route path="/storage" exact component={StoragePage} />
    </Container>
    <Footer />
  </Fragment>
);

export default MyRouter;

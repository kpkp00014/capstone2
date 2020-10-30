import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { useSelector } from "react-redux";
import { Row } from "reactstrap";
import ProjectInit from "../../components/project/ProjectInit";
import ProjectItemAdd from "../../components/project/ProjectItemAdd";
import ProjectList from "../../components/project/ProjectList";
import ProjectItemList from "../../components/project/ProjectItemList";
import ProjectItemFooter from "../../components/project/ProjectItemFooter";

const ProjectPage = () => {
  const { project } = useSelector((state) => state.project);
  if (project === null) {
    //project가 비어있을 경우
    return (
      <Fragment>
        <Helmet title="Project" />
        <Row>
          <ProjectInit />
        </Row>
        <Row>
          <ProjectList />
        </Row>
      </Fragment>
    );
  } else {
    // project가 선택되어있을 경우
    return (
      <Fragment>
        <Helmet title="Project" />
        <Row>
          <ProjectItemAdd />
          <ProjectItemList />
          <ProjectItemFooter />
        </Row>
      </Fragment>
    );
  }
};

export default ProjectPage;

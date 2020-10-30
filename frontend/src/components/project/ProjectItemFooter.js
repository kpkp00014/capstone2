import React, { Fragment } from "react";
import { Col, Row } from "reactstrap";
import ProjectDelete from "./ProjectDelete";
import ProjectExport from "./ProjectExport";

const ProjectItemFooter = () => {
  return (
    <Fragment>
      <Row className="w-100 m-3 mb-0">
        <Col xs="12">
          <ProjectDelete />
        </Col>
      </Row>
      <Row className="w-100 m-3 mt-0">
        <Col xs="12">
          <ProjectExport />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectItemFooter;

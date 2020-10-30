import React, { Fragment, useEffect } from "react";
import { Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_ITEM_LIST_REQUEST } from "../../redux/types";
import ProjectModalUrl from "./ProjectModalUrl";
import ProjectModalText from "./ProjectModalText";
import ProjectModalStorage from "./ProjectModalStorage";

const ProjectItemAdd = () => {
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  useEffect(() => {
    const body = {
      project: project,
      token: localStorage.getItem("token"),
    };
    dispatch({
      type: PROJECT_ITEM_LIST_REQUEST,
      payload: body,
    });
  }, [project]);
  return (
    <Fragment>
      <Row className="w-100 m-3">
        <Col xs="4">
          <ProjectModalUrl />
        </Col>
        <Col xs="4">
          <ProjectModalStorage />
        </Col>
        <Col xs="4">
          <ProjectModalText />
        </Col>
      </Row>
    </Fragment>
  );
};

export default ProjectItemAdd;

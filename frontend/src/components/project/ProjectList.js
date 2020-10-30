import React, { Fragment, useEffect } from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  PROJECT_LIST_REQUEST,
  PROJECT_SELECT_REQUEST,
} from "../../redux/types";
import { Link } from "react-router-dom";

const ProjectBar = (projectLists) => {
  let projects = projectLists.project;

  const dispatch = useDispatch();
  const body = {};
  const onProjectClick = async (e) => {
    let target = e.target;
    while (true) {
      if (target.hasAttribute("data-name")) {
        body.project = target.getAttribute("data-name");
        break;
      } else target = target.parentNode;
    }
    dispatch({
      type: PROJECT_SELECT_REQUEST,
      payload: body,
    });
  };

  return (
    <Fragment>
      {Array.isArray(projects)
        ? projects.map(({ _id, name, created_date }) => {
            const date =
              created_date.split("T")[0] +
              " " +
              created_date.split("T")[1].split(".")[0];
            return (
              <div
                data-name={_id}
                key={_id}
                onClick={onProjectClick}
                className="col-12"
              >
                <Link to="#" className="text-decoration-none text-white">
                  <Row className="ml-3 mr-3 mb-2">
                    <Card className="w-100 " color="secondary">
                      <CardBody className="d-flex justify-content-between p-2">
                        <Col xs="6" className="d-inline">
                          <span>{name}</span>
                        </Col>
                        <Col
                          xs="6"
                          className="d-inline text-right font-weight-light"
                        >
                          {date}
                        </Col>
                      </CardBody>
                    </Card>
                  </Row>
                </Link>
              </div>
            );
          })
        : null}
    </Fragment>
  );
};

const ProjectList = () => {
  const { projectLists } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: PROJECT_LIST_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch]);

  return <ProjectBar project={projectLists} />;
};
export default ProjectList;

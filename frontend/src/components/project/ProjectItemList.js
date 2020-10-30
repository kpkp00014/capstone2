import React, { Fragment } from "react";
import { Button, Row } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_ITEM_DELETE_REQUEST } from "../../redux/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const ProjectItemList = () => {
  const { project, projectItems } = useSelector((state) => state.project);
  const dispatch = useDispatch();
  const itemDelete = (e) => {
    const body = { token: localStorage.getItem("token"), project: project };
    let target = e.target;
    while (true) {
      if (target.hasAttribute("data-name")) {
        body.content = target.getAttribute("data-name");
        break;
      } else target = target.parentNode;
    }
    dispatch({
      type: PROJECT_ITEM_DELETE_REQUEST,
      payload: body,
    });
  };
  return (
    <Fragment>
      <div className="justify-content-center d-flex w-100">
        <div style={{ width: "640px" }}>
          {Array.isArray(projectItems)
            ? projectItems.map(({ _id, owner, isImage, content }) => {
                return (
                  <div data-name={_id} key={_id} onClick={null}>
                    <Row className="m-0 p-0" style={{ width: "inherit" }}>
                      {isImage ? (
                        <img
                          alt="item"
                          className="project-view-image d-inline"
                          src={content}
                        />
                      ) : (
                        <span className="project-view-text d-inline">
                          {content}
                        </span>
                      )}
                      <Button
                        color="danger"
                        className="item-delete-btn"
                        outline
                        onClick={itemDelete}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </Button>
                    </Row>
                  </div>
                );
              })
            : null}
        </div>
      </div>
    </Fragment>
  );
};

export default ProjectItemList;

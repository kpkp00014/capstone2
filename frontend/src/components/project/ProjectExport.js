import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_EXPORT_REQUEST } from "../../redux/types";

const ProjectExport = () => {
  const [modal, setModal] = useState(false);
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const handleToggle = () => {
    setModal(!modal);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      token: localStorage.getItem("token"),
      project: project,
    };
    dispatch({
      type: PROJECT_EXPORT_REQUEST,
      payload: body,
    });
    handleToggle();
  };

  return (
    <div>
      <Button className="w-100" color="success" onClick={handleToggle}>
        Project Export
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>프로젝트를 완성</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="text">
                프로젝트롤 완성시킬까요? 결과물은 STORAGE에서 확인할 수 있습니다
              </Label>
              <Button className="w-100" color="dark">
                확인
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectExport;

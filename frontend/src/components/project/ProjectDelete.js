import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { PROJECT_TERMINATE_REQUEST } from "../../redux/types";

const ProjectDelete = () => {
  const [modal, setModal] = useState(false);
  const [form, setValues] = useState("");
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);
  const handleToggle = () => {
    setValues("");
    setModal(!modal);
  };
  const onChange = (e) => {
    setValues(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    const body = {
      token: localStorage.getItem("token"),
      project: project,
    };
    dispatch({
      type: PROJECT_TERMINATE_REQUEST,
      payload: body,
    });
    handleToggle();
  };

  return (
    <div>
      <Button className="w-100" color="danger" onClick={handleToggle}>
        Project Delete
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>
          프로젝트를 삭제하시겠습니까?
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="text">
                프로젝트 삭제를 원하시면 '삭제' 라고 입력해 주십시오
              </Label>
              <Input className="mb-2" type="text" onChange={onChange} />
              <Button className="w-100" color="dark" disabled={form !== "삭제"}>
                확인
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectDelete;

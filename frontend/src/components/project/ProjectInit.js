import React, { Fragment, useState } from "react";
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { useDispatch } from "react-redux";
import { PROJECT_INIT_REQUEST } from "../../redux/types";
const ProjectInit = () => {
  const [modal, setModal] = useState(false);
  const [pName, setPName] = useState("");
  const dispatch = useDispatch();
  const modalToggle = () => {
    setModal(!modal);
  };
  const onChange = (e) => {
    setPName(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (!pName) return alert("이름을 입력해주세요");
    const token = localStorage.getItem("token");
    const body = { token, pName };
    dispatch({
      type: PROJECT_INIT_REQUEST,
      payload: body,
    });
  };
  const btnClick = () => {
    setModal(true);
  };
  return (
    <Fragment>
      <Col className="m-3">
        <Button onClick={btnClick} className="w-100 btn-block" color="primary">
          프로젝트 생성
        </Button>
      </Col>
      <Modal isOpen={modal} toggle={modalToggle}>
        <ModalHeader toggle={modalToggle}>프로젝트 명</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Input
                type="text"
                name="pName"
                id="pName"
                placeholder="Project Name"
                onChange={onChange}
                className="mb-3"
              />
              <Button className="w-100 btn-block" color="primary">
                Create Project
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default ProjectInit;

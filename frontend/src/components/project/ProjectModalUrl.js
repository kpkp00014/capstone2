import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { PROJECT_ITEM_UPLOAD_REQUEST } from "../../redux/types";

const ProjectModalUrl = () => {
  const [modal, setModal] = useState(false);
  const [form, setValues] = useState("");
  const dispatch = useDispatch();
  const { project } = useSelector((state) => state.project);

  const handleToggle = () => {
    setModal(!modal);
  };
  const onChange = (e) => {
    setValues(e.target.value);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (form === "") return alert("");
    const body = {
      content: form,
      isImage: true,
      token: localStorage.getItem("token"),
      project: project,
    };
    dispatch({
      type: PROJECT_ITEM_UPLOAD_REQUEST,
      payload: body,
    });
    handleToggle();
  };

  return (
    <div>
      <Button className="w-100" color="info" onClick={handleToggle}>
        URL
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>URL로 이미지 등록</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="url">URL</Label>
              <Input className="mb-2" type="url" onChange={onChange} />
              <Button className="w-100" color="dark">
                등록
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectModalUrl;

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

const ProjectModalText = () => {
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
    if (form === "") return alert("내용을 입력해주세요");
    const body = {
      content: form,
      isImage: false,
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
      <Button className="w-100" color="warning" onClick={handleToggle}>
        Text
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>텍스트 문구 등록</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="text">Text</Label>
              <Input className="mb-2" type="text" onChange={onChange} />
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

export default ProjectModalText;

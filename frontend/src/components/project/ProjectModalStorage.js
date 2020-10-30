import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Form,
  FormGroup,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import {
  STORAGE_LOADING_REQUEST,
  PROJECT_ITEM_UPLOAD_REQUEST,
} from "../../redux/types";

const ProjectModalStorage = () => {
  const [modal, setModal] = useState(false);
  const [form, setValues] = useState("");
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.storage);
  const { project } = useSelector((state) => state.project);
  useEffect(() => {
    dispatch({
      type: STORAGE_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch]);

  const handleToggle = () => {
    setModal(!modal);
  };
  const outlineClass = async (e) => {
    let nodes = document.querySelectorAll("[data-name]");
    await nodes.forEach((item) => {
      item.classList.remove("modalOutline");
    });
    e.classList.add("modalOutline");
  };
  const onImageClick = (e) => {
    let target = e.target;
    while (true) {
      if (target.hasAttribute("data-name")) {
        break;
      } else target = target.parentNode;
    }
    outlineClass(target);
    setValues(target.getAttribute("data-name"));
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (form === "") return alert("내용을 선택해주세요");
    const body = {
      content: process.env.REACT_APP_DEFAULT_IMAGE_URL + form,
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
      <Button className="w-100" color="primary" onClick={handleToggle}>
        Storage
      </Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalHeader toggle={handleToggle}>저장소에서 이미지 등록</ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              {Array.isArray(files)
                ? files.map(({ Key }) => {
                    return (
                      <div
                        data-name={Key}
                        key={Key}
                        onClick={onImageClick}
                        style={{ width: "6rem", height: "6rem" }}
                        className="d-inline-block"
                      >
                        <img
                          alt="이미지"
                          src={process.env.REACT_APP_DEFAULT_IMAGE_URL + Key}
                          className="modalImgPopup"
                        />
                      </div>
                    );
                  })
                : null}
              <Button className="w-100 mt-1" color="dark">
                등록
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ProjectModalStorage;

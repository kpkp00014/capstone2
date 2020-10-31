import React, { Fragment, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";
import { Link } from "react-router-dom";
import dotenv from "dotenv";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { STORAGE_IMAGE_DELETE_REQUEST } from "../../redux/types";
import {
  REACT_APP_DEFAULT_FOLDER_URL,
  REACT_APP_DEFAULT_IMAGE_URL,
} from "../../../config";
dotenv.config();

const StorageItemOne = ({ files }) => {
  const [modal, setModal] = useState(false);
  const [modalImg, setModalImg] = useState("");
  const modalToggle = () => {
    setModal(!modal);
  };
  const dispatch = useDispatch();
  const onClickFolder = (e) => {
    e.preventDefault();
  };
  const onClickImage = (e) => {
    e.preventDefault();
    let target = e.target.parentNode;
    while (true) {
      if (target.classList.contains("card")) break;
      else target = target.parentNode;
    }
    target = target.children[0];
    setModal(!modal);
    setModalImg(target.src);
  };
  const deleteImage = (e) => {
    const body = {
      content: modalImg.split(".com/")[1],
      token: localStorage.getItem("token"),
    };
    dispatch({
      type: STORAGE_IMAGE_DELETE_REQUEST,
      payload: body,
    });
  };
  return (
    <Fragment>
      <Modal isOpen={modal} style={{ maxWidth: "90%" }} toggle={modalToggle}>
        <ModalHeader toggle={modalToggle}>Preview</ModalHeader>
        <ModalBody>
          <img src={modalImg} alt="이미지"></img>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={deleteImage} className="w-100">
            삭제
          </Button>
        </ModalFooter>
      </Modal>
      {Array.isArray(files)
        ? files.map(({ Key, LastModified }, index) => {
            let timeSplit = LastModified.split("T")[0];

            if (Key.endsWith("/")) {
              // key가 폴더일 경우
              let folderSplit = Key.split("/");
              let folderName = folderSplit[folderSplit.length - 2];
              return (
                <div key={index}>
                  <Link
                    to="#"
                    onCLick={onClickFolder}
                    className="text-dark text-decoration-none"
                  >
                    <Card style={{ width: "13rem" }} className="mb-3 mr-2">
                      <CardImg
                        top
                        alt="폴더"
                        src={REACT_APP_DEFAULT_FOLDER_URL}
                      />
                      <CardBody className="pb-0 mb-0">
                        <CardTitle className="text-truncate d-flex justify-content-between">
                          <span
                            className="bold text-truncate text-center"
                            style={{ width: "100%" }}
                          >
                            {folderName}
                          </span>
                        </CardTitle>
                        <Row className="text-truncate text-md-right pr-2">
                          <span style={{ width: "100%" }}>
                            <FontAwesomeIcon icon={faClock} />
                            {timeSplit}
                          </span>
                        </Row>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              );
            } else {
              // key가 폴더가 아닐 경우
              let nameSplit = Key.split("/");
              let itemName = nameSplit[nameSplit.length - 1];
              return (
                <div key={index}>
                  <Link
                    to="#"
                    onClick={onClickImage}
                    className="text-dark text-decoration-none"
                  >
                    <Card
                      key={index}
                      style={{ width: "13rem" }}
                      className="mb-3 mr-2"
                    >
                      <CardImg
                        top
                        alt="이미지"
                        src={REACT_APP_DEFAULT_IMAGE_URL + Key}
                      />
                      <CardBody className="pb-0 mb-0">
                        <CardTitle className="text-truncate d-flex justify-content-between">
                          <span className="text-truncate">{itemName}</span>
                        </CardTitle>
                        <Row className="text-truncate text-md-right pr-2">
                          <span style={{ width: "100%" }}>
                            <FontAwesomeIcon icon={faClock} />
                            {timeSplit}
                          </span>
                        </Row>
                      </CardBody>
                    </Card>
                  </Link>
                </div>
              );
            }
          })
        : null}
    </Fragment>
  );
};

export default StorageItemOne;

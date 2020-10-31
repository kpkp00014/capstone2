import React, { Fragment, useState } from "react";
import { Button, CustomInput } from "reactstrap";
import { useDispatch } from "react-redux";
import { FILE_UPLOAD_REQUEST } from "../../redux/types";

const StorageItemUpload = () => {
  const [form, setValues] = useState({ file: "" });
  const dispatch = useDispatch();
  const onChange = (e) => {
    let file = e.target.files[0];
    setValues({
      file: file,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { file } = form;
    const token = localStorage.getItem("token");
    const body = { file, token };
    dispatch({
      type: FILE_UPLOAD_REQUEST,
      payload: body,
    });
  };
  return (
    <Fragment>
      <div
        className="justify-content-between d-flex align-items-center"
        style={{ width: "100%" }}
      >
        <CustomInput
          id="storageUploadForm"
          type="file"
          name="file"
          className="mr-3"
          onChange={onChange}
        />
        <Button type="button" onClick={onSubmit}>
          upload
        </Button>
      </div>
    </Fragment>
  );
};

export default StorageItemUpload;

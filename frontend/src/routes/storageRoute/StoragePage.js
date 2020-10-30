import React, { Fragment, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "reactstrap";
import StorageItemOne from "../../components/storage/StorageItemOne";
import StorageItemUpload from "../../components/storage/StorageItemUpload";
import { STORAGE_LOADING_REQUEST } from "../../redux/types";
const StoragePage = () => {
  const dispatch = useDispatch();
  const { files } = useSelector((state) => state.storage);
  useEffect(() => {
    dispatch({
      type: STORAGE_LOADING_REQUEST,
      payload: localStorage.getItem("token"),
    });
  }, [dispatch]);

  return (
    <Fragment>
      <Helmet title="Storage" />
      <Row className="m-3">
        <StorageItemUpload />
      </Row>
      <Row>{files ? <StorageItemOne files={files} /> : null}</Row>
    </Fragment>
  );
};

export default StoragePage;

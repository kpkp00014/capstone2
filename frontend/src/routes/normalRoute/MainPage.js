import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import { Row } from "reactstrap";
const MainPage = () => {
  return (
    <Fragment>
      <Helmet title="Home" />
      <div className="m-3">
        <Row>
          <h2>이용 방법</h2>
        </Row>
        <Row className="ml-3">
          <h3>1. 회원가입을 한다</h3>
        </Row>
        <Row className="ml-3">
          <h3>2. 로그인을 한다</h3>
        </Row>
        <Row className="ml-3">
          <h3>3. Storage에 사진을 업로드 할 수 있다</h3>
        </Row>
        <Row className="ml-3">
          <h3>
            4. Project에서 사진과 텍스트를 세로로 이어서 캡쳐한 이미지를 만들 수
            있다
          </h3>
        </Row>
        <Row className="ml-3">
          <h3>
            5. Project에서 Export를 하면 완성된 이미지를 Storage에서 확인할 수
            있다.
          </h3>
        </Row>
      </div>
    </Fragment>
  );
};

export default MainPage;

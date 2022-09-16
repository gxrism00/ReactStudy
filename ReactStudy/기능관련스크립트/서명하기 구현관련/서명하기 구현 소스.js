import { Container, Row, Col } from "react-bootstrap";
import { useState } from "react";
// import { Link } from "react-router-dom";

import SignatureCanvas from "react-signature-canvas";
import styled from "styled-components";
import { motion } from "framer-motion";

const UserActionBtn = styled.button`
    border: 0;
    border-radius: 3rem 3rem 0rem 3rem;
    padding: 1.5rem 2rem;
    box-shadow: 0rem 0.5rem 1rem rgba(0, 0, 0, 0.15);
    margin: 0.5rem 0rem;
`;

const CanvasStyle = styled.div`
    border-radius: 10rem 10rem 0rem 10rem;
    padding: 4.5rem 4.5rem;
    margin: 0.5rem 0px;
    border: 0;
`;

function SignCanvas(props) {
    // const link = props.link; //필수

    let userSign = {};
    const [isBegin, setIsBegin] = useState(false);
    // 사용자가 붓을 그리기 시작할때마다 발생
    const onBegin = () => {
        setIsBegin(true);
        // console.log("Begin");
    };

    const clear = () => {
        setIsBegin(false);
        userSign.clear();
        // console.log("clear");
    };

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
        >
            <Container>
                <Row>
                    <Col>
                        <CanvasStyle
                            className="bg-primary"
                            style={{ height: "50vh" }}
                        >
                            <SignatureCanvas
                                ref={(ref) => {
                                    userSign = ref;
                                }}
                                penColor="white"
                                canvasProps={{
                                    className: "w-100 h-100",
                                }}
                                onBegin={onBegin}
                                // backgroundColor="red"
                            />
                            <div className="d-flex justify-content-center">
                                <span className="text-white">서명해주세요</span>
                                <span
                                    className="ms-1  border-white border-bottom border-1"
                                    style={{ width: "60%" }}
                                ></span>
                            </div>
                        </CanvasStyle>
                    </Col>
                </Row>
                <Row>
                    <Col className=" d-flex justify-content-end">
                        {isBegin ? (
                            <>
                                <UserActionBtn
                                    className="btn-dark"
                                    onClick={clear}
                                >
                                    {"< 다시하기"}
                                </UserActionBtn>
                                {/* <Link to={link}> */}
                                <UserActionBtn className="ms-1 btn-primary">
                                    {"서명완료"}
                                </UserActionBtn>
                                {/* </Link> */}
                            </>
                        ) : (
                            <UserActionBtn className="btn-secondary">
                                {"서명해주세요"}
                            </UserActionBtn>
                        )}
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
}

export default SignCanvas;

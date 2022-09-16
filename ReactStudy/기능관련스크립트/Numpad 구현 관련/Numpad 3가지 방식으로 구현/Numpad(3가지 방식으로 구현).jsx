import { Button, Container, Col, Row, Form } from "react-bootstrap";
import { useState } from "react";

const NumpadTest = () => {
    const [value, setValue] = useState("");
    const changeValue = (e) => {
        console.log(e.target.value);
        if (e.target.value === "취소") {
            // setValue((value) => "");
            setValue(value.slice(0, -1));
        } else {
            if (value.length <= 15) setValue((value) => value + e.target.value);
        }
    };
    const submit = () => {
        console.log(value);
    };

    return (
        <>
            <Form.Label>
                전화번호
                <Form.Control
                    placeholder="010-1234-5678"
                    defaultValue={value}
                    readOnly
                    plaintext="true"
                ></Form.Control>
            </Form.Label>
            <Container>
                {[7, 8, 9, 4, 5, 6, 1, 2, 3].map((num) => {
                    const test = num % 3 === 0 ? <br /> : null;
                    return (
                        <span key={num}>
                            <Button
                                className="px-5 m-1 btn-dark"
                                onClick={changeValue}
                                value={num}
                            >
                                {num}
                            </Button>
                            {test}
                        </span>
                    );
                })}
                {["취소", 0, "완료"].map((num) => {
                    let color = "px-5 m-1 btn-dark";
                    if (num === "취소") color = "px-4 me-3 btn-danger";
                    else if (num === "완료") color = "px-4 ms-3 btn-primary";

                    return (
                        <span key={num}>
                            <Button
                                className={color}
                                onClick={changeValue}
                                value={num}
                            >
                                {num}
                            </Button>
                        </span>
                    );
                })}
            </Container>
            <Container>
                <Row>
                    <Col sm={1} md={4} />
                    <Col>
                        <Container>
                            {[
                                [7, 8, 9],
                                [4, 5, 6],
                                [1, 2, 3],
                                ["취소", 0, "완료"],
                            ].map((rowNum, i) => {
                                const test = rowNum.map((colNum) => {
                                    let color = "btn-dark";
                                    let clickHandle = changeValue;
                                    if (colNum === "취소") color = "btn-danger";
                                    else if (colNum === "완료") {
                                        color = "btn-primary";
                                        clickHandle = submit;
                                    }
                                    return (
                                        <Col key={colNum} className="p-0">
                                            <Button
                                                className={` m-1 ${color}`}
                                                onClick={clickHandle}
                                                value={colNum}
                                                style={{ width: "90%" }}
                                            >
                                                {colNum}
                                            </Button>
                                        </Col>
                                    );
                                });
                                return <Row key={i}>{test}</Row>;
                            })}
                        </Container>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row>
                    <Col sm={1} md={6} />
                    <Col>
                        <Container className="p-0">
                            <Row>
                                {[
                                    1,
                                    2,
                                    3,
                                    4,
                                    5,
                                    6,
                                    7,
                                    8,
                                    9,
                                    "취소",
                                    0,
                                    "완료",
                                ].map((Num) => {
                                    let color = "btn-dark";
                                    let clickHandle = changeValue;
                                    if (Num === "취소") color = "btn-danger";
                                    else if (Num === "완료") {
                                        color = "btn-primary";
                                        clickHandle = submit;
                                    }

                                    return (
                                        <Col
                                            sm={4}
                                            md={4}
                                            key={Num}
                                            className="p-0"
                                        >
                                            <UserActionBtn
                                                className={` m-1 ${color}`}
                                                onClick={clickHandle}
                                                value={Num}
                                                style={{ width: "90%" }}
                                            >
                                                {Num}
                                            </UserActionBtn>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Container>
                    </Col>
                </Row>
            </Container>
        </>
    );
};
export default NumpadTest;

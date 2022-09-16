import { Container } from "react-bootstrap";
import { Col, Row } from "react-bootstrap";
import { Link, Element } from "react-scroll";
import { Link as Moved } from "react-router-dom";
import { useState, React } from "react";
import styled from "styled-components";

const ScrollRemove = styled.div`
    height: 50vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;
const ClientAsk = styled.div`
    border-radius: 3rem 3rem 0rem 0px;
    padding: 1.5rem 2rem;
    margin: 0.5rem 0px 0px;
    background-color: #000;
    color: white;
`;

const ClientAskContainer = styled.div`
    border-radius: 0px 0rem 3rem 0px;
    border: 0.25rem solid black;
    padding: 1.5rem 1rem 1rem;
    margin: 0px 0px 0.5rem 0px;
    color: black;
`;

const Test = (props) => {
    const { headContent, bodyTextContent, bodyAskContent } = props;

    return (
        <>
            <ScrollRemove id="ScrollContainer">
                <Row className="m-0">
                    <Col sm={11} className="d-grid px-0 fw-bold fs-2">
                        <ClientAsk>{headContent}</ClientAsk>
                    </Col>
                    <Col sm={1} />
                </Row>
                <Row className="m-0">
                    <Col sm={11} className="d-grid px-0 lh-base">
                        <ClientAskContainer>
                            <Row className="text-start m-0">
                                {bodyTextContent}
                                {bodyAskContent}
                            </Row>
                        </ClientAskContainer>
                    </Col>
                    <Col sm={1} />
                </Row>
            </ScrollRemove>
        </>
    );
};

export default function App() {
    const [buttonList, setButtonList] = useState("start");
    let button = null;
    switch (buttonList) {
        case "start":
            button = (
                <Link
                    to="middle"
                    spy={true}
                    smooth={true}
                    duration={200}
                    containerId="ScrollContainer"
                >
                    <button onClick={() => setButtonList("middle")}>
                        다음 페이지
                    </button>
                </Link>
            );
            break;

        case "middle":
            button = (
                <>
                    <Link
                        to="start"
                        spy={true}
                        smooth={true}
                        duration={200}
                        containerId="ScrollContainer"
                    >
                        <button onClick={() => setButtonList("start")}>
                            이전 페이지
                        </button>
                    </Link>
                    <Link
                        to="end"
                        spy={true}
                        smooth={true}
                        duration={200}
                        containerId="ScrollContainer"
                    >
                        <button onClick={() => setButtonList("end")}>
                            다음 페이지
                        </button>
                    </Link>
                </>
            );
            break;

        case "end":
            button = (
                <>
                    <Link
                        to="middle"
                        spy={true}
                        smooth={true}
                        duration={200}
                        containerId="ScrollContainer"
                    >
                        <button onClick={() => setButtonList("middle")}>
                            이전 페이지
                        </button>
                    </Link>
                    <Moved to="/23">
                        <button>확인했어요</button>
                    </Moved>
                </>
            );
            break;

        default: {
            console.log("error");
            break;
        }
    }

    return (
        <div className="App">
            <Container>
                <Element name="start" />
                <Test
                    headContent={
                        "개인정보보호 및 행정정보 제공요구에 대해 동의해주세요"
                    }
                    bodyTextContent={
                        <>
                            <p>## 개인정보보호법에 관한 동의</p>
                            <br />
                            <p>
                                귀하는 개인정보 제공 요구를 거부하실 수
                                있습니다. 다만, 개인정보 제공 요구는 민원서식
                                신청을 위한 필수적 사항이므로 아래의 내용에
                                동의하셔야만 민원서식 신청이 가능합니다. 내용을
                                자세히 읽으신 후 동의 여부를 결정하여 주십시오.
                            </p>
                            <p>1. 개인정보 수집 · 이용 내역</p>
                            <p>이름, 주민번호, 주소,세대원정보, 전화번호</p>
                            <Element name="middle" />
                            <p>2. 개인정보 수집 · 이용 목적</p>
                            <p>* 신청인 본인확인 </p>
                            <p>* 문화이용권 신청서</p>
                            <br /> <p>3. 개인정보 보유 · 이용 기간</p>
                            <p>* 민원 서비스 이용 완료 후 30분 </p>
                            <br />
                            <p>4. 개인정보 수집 항목</p>
                            <p>
                                * 주민등록등 · 초본 - 성명, 주민번호, 주소,
                                세대원 정보
                            </p>
                            <br />
                            <p>
                                ※ 위의 개인정보 수집ㆍ이용에 대한 동의를 거부할
                                권리가 있습니다. 그러나 동의를 거부할 경우, 공공
                                마이데이터 서비스의 신청 및 결과를 제공 받으실
                                수 없습니다.
                            </p>
                            <br />
                            <br />
                            <br />
                            <p>## 본인에 관한 행정정보 제공 동의서 </p>
                            <br />
                            <br />
                            <p>
                                * 귀하는 본인에 관한 행정정보 제공 요구를
                                거부하실 수 있습니다. 다만, 본인에 관한 행정정보
                                제공 요구는 민원서식 신청을 위한 필수적
                                사항이므로 아래의 내용에 동의하셔야만 민원서식
                                신청이 가능합니다.
                            </p>
                            <br />
                            <p>
                                내용을 자세히 읽으신 후 동의 여부를 결정하여
                                주십시오.
                            </p>
                            <p>1. 제공 요구를 받는 행정기관등의 장</p>
                            <p>* 행정안전부 장관</p>
                            <br />
                            <p>2. 제공을 요구하는 본인정보</p>
                            <p>* 주민등록표 등.초본</p>
                            <br />
                            <p>3. 제공 요구에 따라 본인정보를 제공받는자</p>
                            <p>* &#123;담당 자치단체&#125;</p>
                            <br />
                            <p>
                                4. 정기적 제공요구 여부 및 정기적 제공요구 시
                                주기 및 종료시점
                            </p>
                            <p>* 일회적 제공 동의</p>
                            <br />
                            <p>
                                ※ 위의 본인에 관한 행정정보 제공 동의를 거부할
                                권리가 있습니다. 그러나 동의를 거부할 경우, 공공
                                마이데이터 서비스의 신청 및 결과를 제공 받으실
                                수 없습니다.
                            </p>
                            <Element name="end">Item 3</Element>
                        </>
                    }
                />
                {button}
            </Container>
        </div>
    );
}

//부모 컴포넌트
//하나의 useRef로 관리
const focusTarget = useRef([]);

//자식컴포넌트에서 onClick 이벤트를 받아옴
  const scrollTo = (e) => {
    //구조분해할당
    const name = e.target.name;

    const category = {
      design: 0,
      contact: 1,
      qna: 2,
    };
    //category의 name의 키값과 같은 컴포넌트로 이동
  focusTarget.current[category[name]].scrollIntoView({ behavior: 'smooth' });
  };

return(
  //자식에게 넘겨줌
    <Nav scrollTo={scrollTo} />
//객체의 키값과 같게 만들어줌
      <Title ref={el => (focusTarget.current[0] = el)}>DESIGN</Title>
      <ContactTitle ref={el => (focusTarget.current[1] = el)}>
        CONTACT
      </ContactTitle>
      <Title ref={el => (focusTarget.current[2] = el)}>QnA</Title>
)}

//자식 컴포넌트
const Nav = ({ scrollTo }) => {
      return(
          <Design name="design" onClick={scrollTo}>
            DESIGN
          </Design>
          <Contact name="contact" onClick={scrollTo}>
            CONTACT
          </Contact>
          <Qna name="qna" onClick={scrollTo}>
            QnA
          </Qna>
   ) }
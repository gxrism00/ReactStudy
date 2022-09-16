import '../../styles/modal.css';

export default function Modal (props){
  // 열기, 닫기, 모달 헤더 텍스트, 데이타를 부모로부터 받아옴
    const { open, close, header, data} = props;

    const handleOutside = (e) => {
        // 모달 밖 클릭시 모달 종료되는 함수   
        console.log(e.target.className);
        const clicked = e.target.className === 'openModal modal' ? true:false;

        if (!clicked) return;
        
        else {
            close();
        }
    };

    return (
        // 모달이 열릴때 openModal 생성된다.
        
        <div onClick ={(e)=>handleOutside(e)} className={open ? 'openModal modal' : 'modal'}>
        {open ? (           
            <section>
                <header>
                    {header}
                    <button className="close" onClick={close}>
                        &times; 
                    </button>
                </header>

                <main>
                    {data.text}
                </main>

                <footer>
                    <button className="close" onClick={close}>
                        close
                    </button>
                </footer>
            </section>
            
        ) : null}
        </div>
    );
};
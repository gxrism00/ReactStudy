import React, { useState, useRef } from 'react';

function Header(){
    const [menuBtnClick, setMenuBtnClick] = useState(false);
    const outSection = useRef();

    return (
        <>
        <header>
        ...
            <button type="button" onClick={()=>{setMenuBtnClick(true)}}>
            메뉴버튼
            </button>
        ...
            {
                menuBtnClick === true
                ? (<div class="modal-outside" ref={outSection} onClick={(e)=>{
                if(outSection.current === e.target) {
                    setMenuBtnClick(false)
                }
            }}>
                <div class="modal-content"> 모달창 내용</div>
            <div>)
            : null
            }
        </header>
        </>
        );
}
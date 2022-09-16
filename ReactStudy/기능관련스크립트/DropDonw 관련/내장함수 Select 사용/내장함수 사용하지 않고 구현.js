import React ,{useState}from "react";

export default function Test(){
    const flex ={
        display : "flex",
        justifyContent : "center"
    }
    const options= [{
        name:'option 1',
        key :1
    },
    {
        name:'option 2',
        key :2
    },
    {
        name:'option 3',
        key :3
    }
    ]
    const [selectedOption,setSelectedOption] = useState("")
    const [isOpen, setIsOpen] = useState(true)

    const handleClick = (option)=>{
        setSelectedOption(option.name)
        setIsOpen(false)
    }
    return (
        <div style={flex}>
            <div style ={{backgroundColor :"gray", borderRadius:"5px", width:"300px", height:"100px"}}>
                <div width="300px" >
                    <span>{selectedOption}</span>
                    {
                        selectedOption && <button onClick = {()=>setSelectedOption("")}>X</button>
                    }
                    <button onClick ={() => setIsOpen(state =>!state)}>{isOpen ? "Close" : "Open"}</button>
                </div>
            {
                isOpen && options.map((option)=>{
                    return (
                        <div cursor ="pointer" onClick={()=>handleClick(option)}>
                            {option.name}
                        </div>
                    )
                })
            }
            </div>
        </div>
        
    ) ;
}
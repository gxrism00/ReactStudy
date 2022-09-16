const DropDown = () =>{
        
        const optionlist =[
            {
                id :1,
                value : '문의1',
                label : '문의'
            },
            {
                id :2,
                value : '문의2',
                label : '문의'
            },
            {
                id :3,
                value : '문의3',
                label : '낫문의'
            }
        ];


        return (
        <div>
            {/* Select로 구현 */}
            <select aria-label="DropDown" style={{width : "100%", height : "40px", marginTop:"2px", borderColor : "red", borderRadius : "6px"}}>
                {
                //아래는 그냥 필터 사용해본겁니다.
                optionlist.filter((options)=>options.label==='문의').map((options)=>(
                    <option key ={options.id} value={options.value}>{options.value}</option>
                ))
                }
            </select>
        </div>
        );
}
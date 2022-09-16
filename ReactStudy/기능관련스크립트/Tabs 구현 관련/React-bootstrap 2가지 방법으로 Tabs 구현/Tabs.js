import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { motion } from "framer-motion";
import { useState } from "react";
import { Nav } from "react-bootstrap";

function MyTabs() {
    const tabs = [
        {
            id: 1,
            name: "복지",
            content: "복지",
        },
        {
            id: 2,
            name: "생활",
            content: "생활카드들",
        },
        {
            id: 3,
            name: "주민등록증",
            content: "주민등록증 카드",
        },
        {
            id: 4,
            name: "여권",
            content: "여권",
        },
    ];
    const [selectedTab, setSelectedTab] = useState(tabs[0].name);
    const [selectedTab2, setSelectedTab2] = useState(tabs[0].id);

    const TabTitle = (props) => {
        const name = props.name;

        return (
            <div className="text-dark">
                <span className={name}>{name}</span>
                {name === selectedTab ? (
                    <motion.div
                        className="underline bg-dark"
                        layoutId="underline"
                        style={{ height: "5px" }}
                    />
                ) : null}
            </div>
        );
    };

    const clickhandle = (k) => {
        return setSelectedTab(k);
        // return console.log(k);
    };

    const clickhandle2 = (e) => {
        return setSelectedTab2(e.target.tabIndex);
        // return console.log(e.target.tabIndex);
    };
    return (
        <div className="fs-2 Main">
            <Tabs
                defaultActiveKey="복지"
                id="main-tab"
                className="m-3"
                // className="m-3 border-0"
                onSelect={clickhandle}
            >
                {tabs.map((item) => (
                    <Tab
                        key={item.id}
                        eventKey={item.name}
                        title={<TabTitle name={item.name} />}
                        style={{ height: "250px" }}
                        className="p-3"
                    >
                        {item.content}
                    </Tab>
                ))}
            </Tabs>

            <Nav variant="tabs" defaultActiveKey="1">
                {tabs.map((item) => (
                    <Nav.Item key={item.id}>
                        <Nav.Link
                            as="button"
                            eventKey={item.id}
                            tabIndex={item.id}
                            onClick={clickhandle2}
                            className="border-0 text-dark"
                        >
                            {item.name}
                        </Nav.Link>
                        {selectedTab2 === item.id ? (
                            <motion.div
                                className="underline bg-dark m-auto"
                                layoutId="underline"
                                style={{ height: "5px", width: "90%" }}
                            />
                        ) : null}
                    </Nav.Item>
                ))}
            </Nav>
            {/* 단점 : 매번 다시 그려줘야하기때문에 성능측면에서 위에것보다 떨어진다고 생각 */}
            {/* 위는 한번에 다구현해놓은것을 화면만 바꿈  */}
            <div className="tab-content">
                {selectedTab2 === tabs[0].id ? 1 : null}
                {selectedTab2 === tabs[1].id ? 2 : null}
                {selectedTab2 === tabs[2].id ? 3 : null}
                {selectedTab2 === tabs[3].id ? 4 : null}
            </div>
        </div>
    );
}

export default MyTabs;

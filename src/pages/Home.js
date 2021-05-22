import React from 'react';
import StickyHeadTable from "./PostTable";

function Home() {
    return (
        <div className="tb_container">
            <h3>文章列表</h3>
            <StickyHeadTable/>
        </div>
    );
}

export default Home;
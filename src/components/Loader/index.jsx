import React from "react";
import Ionicon from 'react-ionicons';

const Loader = () => (
    <div className="text-center">
        <Ionicon
            icon="ios-refresh"
            fontSize="40px"
            color="#007bff"
            rotate={true}
        />
        <h6>加载中...</h6>
    </div>
)

export default Loader
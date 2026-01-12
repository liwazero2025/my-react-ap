import React from 'react';
import {Link} from 'react-router-dom';

const Forbidden = () => {
    return (
        <div style={{padding: 24}}>
            <h2>无权限访问</h2>
            <p>您没有足够的权限访问此页面。</p>
            <p><Link to="/">返回首页</Link></p>
        </div>
    );
};

export default Forbidden;
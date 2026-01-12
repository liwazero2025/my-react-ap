import React from 'react';
import {useAuth} from '../../context/AuthContext';

const Dashboard = () => {
    const auth = useAuth();

    return (
        <div style={{padding: 24}}>
            <h2>用户控制面板</h2>
            <p>欢迎，{auth.user?.username}（{auth.user?.role}）。</p>
            <p>这是需要登录才能看到的内容。</p>
        </div>
    );
};

export default Dashboard;
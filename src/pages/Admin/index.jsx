import React from 'react';
import {useAuth} from '../../context/AuthContext';

const Admin = () => {
    const auth = useAuth();

    return (
        <div style={{padding: 24}}>
            <h2>管理员页面</h2>
            <p>只有角色为 <strong>admin</strong> 的用户能看到这页。</p>
            <p>当前用户：{auth.user?.username}（{auth.user?.role}）</p>
        </div>
    );
};

export default Admin;
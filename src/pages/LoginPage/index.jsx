import React, {useState} from 'react';
import {useLocation, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = (e) => {
        e.preventDefault();
        auth.login({username, password, role});
        navigate(from, {replace: true});
    };

    return (
        <div style={{padding: 24}}>
            <h2>登录</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        用户名: <input value={username} onChange={(e) => setUsername(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        密码: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </label>
                </div>
                <div>
                    <label>
                        身份: 
                        <select value={role} onChange={(e) => setRole(e.target.value)}>
                            <option value="user">普通用户</option>
                            <option value="admin">管理员</option>
                        </select>
                    </label>
                </div>
                <div style={{marginTop: 12}}>
                    <button type="submit">登录</button>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
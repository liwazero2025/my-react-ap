import React from "react";
import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../../context/AuthContext';

const IndexPage = () => {
    const auth = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        auth.logout();
        navigate('/');
    };

    return (
        <div className="indexPageContainer" style={{padding: 24}}>
            <h2>首页</h2>
            <nav style={{marginBottom: 12}}>
                <Link to="/">主页</Link> | <Link to="/dashboard">用户面板</Link> | <Link to="/admin">管理员页</Link>
            </nav>

            <div>
                {auth.isAuthenticated() ? (
                    <div>
                        已登录：{auth.user?.username}（{auth.user?.role}） <button onClick={handleLogout}>登出</button>
                    </div>
                ) : (
                    <div>
                        未登录，<Link to="/login">去登录</Link>
                    </div>
                )}
            </div>
        </div>
    )

}

export default IndexPage;
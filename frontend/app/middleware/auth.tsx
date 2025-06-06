// middleware/auth.ts
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

export const withAuth = (Component) => {
  const AuthGuard = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    // 如果用户未认证且已完成加载，则重定向到登录页
    if (!loading && !isAuthenticated) {
      navigate("/login");
      return null;
    }

    // 加载中或已认证，渲染组件
    return <Component {...props} />;
  };

  return AuthGuard;
};
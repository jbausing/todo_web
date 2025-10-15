import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useLazyGetUserQuery } from "@/store/api/authApi";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess, logout } from "@/store/auth/authSlice";
import type { RootState } from "@/store";
import { Loading } from "../reusables/Loading";

const ProtectedRoute = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );
  const currentId = useSelector((state: RootState) => state.auth.id);

  const [getUser] = useLazyGetUserQuery();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser({}).unwrap();
        if (!user?.id) throw new Error("No user ID");

        dispatch(loginSuccess({ id: String(user.id) }));

        setCheckedAuth(true);
      } catch (err) {
        console.error("Auth check failed:", err);
        dispatch(logout());
        setCheckedAuth(true);
      }
    };

    if (!isAuthenticated) {
      checkAuth();
    } else {
      setCheckedAuth(true);
    }
  }, [dispatch, getUser, isAuthenticated, currentId, location.pathname]);

  if (!checkedAuth) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

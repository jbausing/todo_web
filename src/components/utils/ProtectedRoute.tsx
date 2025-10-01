import { Navigate, useLocation, Outlet } from "react-router-dom";
import {
  useLazyGetUserQuery,
  useLazyGetUsersWithRoleQuery,
} from "@/store/api/authApi";
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
  const currentRole = useSelector((state: RootState) => state.auth.role);

  const [getUser] = useLazyGetUserQuery();
  const [getUsersWithRole] = useLazyGetUsersWithRoleQuery();
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await getUser().unwrap();
        if (!user?.id) throw new Error("No user ID");

        // Only fetch role if it's not already set and we're not on the user-guide page
        if (!currentRole && location.pathname !== "/user-guide") {
          const roleResponse = await getUsersWithRole({
            userId: user.id,
          }).unwrap();
          dispatch(loginSuccess({ role: roleResponse.role }));
        }
        setCheckedAuth(true);
      } catch {
        dispatch(logout());
        setCheckedAuth(true);
      }
    };

    if (!isAuthenticated) {
      checkAuth();
    } else {
      setCheckedAuth(true);
    }
  }, [
    dispatch,
    getUser,
    getUsersWithRole,
    isAuthenticated,
    currentRole,
    location.pathname,
  ]);

  if (!checkedAuth) {
    return <Loading />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

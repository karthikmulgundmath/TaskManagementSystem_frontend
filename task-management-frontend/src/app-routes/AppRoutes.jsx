import { Fragment, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routeNames } from "./RouteNemes";
import Dashboard from "../pages/dashboard/Dashboard";
import Login from "../pages/login/login";
import ProtectedRoutes from "./ProtectedRoutes";
import UserManagement from "../pages/user-management/UserManagement";
import ProjectManagement from "../pages/project-management/ProjectManagement";
import ProjectView from "../pages/project-management/project-view/ProjectView";

const AppRoutes = () => {
  const authToken = localStorage.getItem("authToken");
  let routes = (
    <Fragment>
      <Route path="/" element={<Login />} />
      <Route path={routeNames.login} element={<Login />} />
      <Route path="*" element={<Navigate to={"/"} />} />
    </Fragment>
  );

  if (authToken !== null) {
    routes = (
      <Route element={<ProtectedRoutes />}>
        <Route path={"/"} element={<Dashboard />} />
        <Route path={routeNames.dashboard} element={<Dashboard />} />
        <Route path={routeNames.userManagement} element={<UserManagement />} />
        <Route
          path={routeNames.projectManagement}
          element={<ProjectManagement />}
        />
        <Route path={routeNames.projectView} element={<ProjectView />} />
        <Route path={"*"} element={<UserManagement />} />
      </Route>
    );
  }

  return (
    <Suspense fallback={"isLoading..."}>
      <Routes>{routes}</Routes>
    </Suspense>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import { memo } from "react";
import Recover from "../layouts/layout.recover";
import { menuConfig } from "../config/config.menu";
import { IMenuItem } from "../utils/util.interface";
import { routesProcess } from "../utils/util.routes-process";

import PrivateRoute from "./route.auth";
import Login from "../layouts/layout.login";
import RecoverPass from "../layouts/layout.recover-pass";
import VerifyAccount from "../layouts/layout.verify-account";
import NoMatch from "../layouts/layout.404";
const MemoPrivateRoute = memo(PrivateRoute);

export default function Main() {
  const routesProcessor: IMenuItem[] = routesProcess(menuConfig);
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/recover" element={<Recover />} />
      <Route path="/recover-pass/:id" element={<RecoverPass />} />
      <Route path="/verify-account/:id" element={<VerifyAccount />} />
      <Route path="*" element={<NoMatch />} />

      <Route element={<MemoPrivateRoute />}>
        {routesProcessor?.map((item, index) => {
          if (item.component === undefined) return null;
          return <Route key={index} path={item.path} element={<item.component />} />;
        })}
      </Route>
    </Routes>
  );
}

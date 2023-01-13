import React from 'react';
import { Route } from "react-router-dom";
import AuthPage from "./AuthPage";
import SignIn from "./Components/SignIn";
import Register from "./Components/Register";

export default function AuthRouter() {
  return (
    <Route path="/auth/" element={<AuthPage/>}>
      <Route path="login" element={<SignIn/>} />
      <Route path="register" element={<Register/>} />
    </Route>
  );
}


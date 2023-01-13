import {Route} from "react-router-dom";
import ErrorPage from "./404";

export default function ErrorRouter() {
  return (
    <>
      <Route path="/404" element={<ErrorPage/>} />
      <Route path="/*" element={<ErrorPage/>} />
    </>
  )
}
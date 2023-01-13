import {PublishedPage} from "../index";
import {Route} from "react-router-dom";
import React from "react";

export default function SharedNoteRouter() {
  return (
    <Route path="/page/:user_id/:post_id" element={<PublishedPage />} />
  )
}
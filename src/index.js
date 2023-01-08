import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/css/index.css';
import './assets/css/cn_scrollbars.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  Home,
  PublishedPage,
  PublishedPageError
} from "pages";
import Editor from 'components/Editor/Editor';
import EditorNoNoteSelected from 'components/Editor/EditorNoNoteSelected';
import EditorNote from 'components/Editor/EditorNote';
import store from 'stores/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store} >
    <Router>
      <Routes>
        <Route path="/" element={<Home />} >
          <Route path="" element={<Editor />} >
            <Route path="" element={<EditorNoNoteSelected/>} />
            <Route path="edit/error" element={<PublishedPageError/>} />
            <Route path="edit/:user_id/:post_id" element={<EditorNote />} />
          </Route>
        </Route>
        <Route path="/page/:user_id/:post_id" element={<PublishedPage />} />
        <Route path="/page/error" element={<PublishedPageError />} />
      </Routes>
    </Router>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

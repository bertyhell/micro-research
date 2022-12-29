import React from "react";
import { NavLink, Route, Routes } from "react-router-dom";
import "./App.scss";
import Answer from "./pages/Answer/Answer";
import Discover from "./pages/Discover/Discover";
import Home from "./pages/Home/Home";
import Create from "./pages/Create/Create";
import {
  faBookOpen,
  faCirclePlus,
  faComment,
  faHome,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ErrorPage from "./components/ErrorView/ErrorView";
import Project from "./pages/Project/Project";

function App() {
  const isActive = ({ isActive }: { isActive: boolean }) => {
    return isActive ? "c-button c-link-active" : "c-button";
  };

  return (
    <>
      <div className="c-bg"></div>
      <div className="c-app">
        <nav>
          <div className="c-links">
            <NavLink to="/" className={isActive}>
              <FontAwesomeIcon icon={faHome} />
              HOME
            </NavLink>
            <NavLink to="/answer" className={isActive}>
              <FontAwesomeIcon icon={faComment} />
              ANSWER
            </NavLink>
            <NavLink to="/discover" className={isActive}>
              <FontAwesomeIcon icon={faBookOpen} />
              DISCOVER
            </NavLink>
            <NavLink to="/create" className={isActive}>
              <FontAwesomeIcon icon={faCirclePlus} />
              CREATE
            </NavLink>
          </div>
        </nav>
        <div className="c-content">
          <Routes>
            <Route path="/" element={<Home />} errorElement={<ErrorPage />} />
            <Route
              path="/answer"
              element={<Answer />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/discover"
              element={<Discover />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/create"
              element={<Create />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="/projects/:id"
              element={<Project />}
              errorElement={<ErrorPage />}
            />
            <Route
              path="*"
              element={<ErrorPage />}
              errorElement={<ErrorPage />}
            />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default App;

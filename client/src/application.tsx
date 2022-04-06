import React, { useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import logging from "./config/logging";
import routes from "./config/routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import IRoute from "./interfaces/route";

const Application: React.FunctionComponent<{}> = (props) => {
  useEffect(() => logging.info(`Loading Application...`), []);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="!#">
            NodeJs GraphQL PostgreSQL React
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/"} className="nav-link">
                  Films
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/genre"} className="nav-link">
                  Genres
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          {routes.map((v: IRoute, i) => (
            <Route
              path={v.path}
              element={<v.component name={v.name} />}
              key={i}
            />
          ))}
        </Routes>
      </div>
    </div>
  );
};

export default Application;

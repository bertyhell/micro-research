import React, { FC } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBug,
  faMagnifyingGlass,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

import "./ErrorView.scss";

interface ErrorViewProps {
  message?: string;
  icon?: IconProp;
}

const ErrorView: FC<ErrorViewProps> = ({ message, icon }) => {

  const type = message ? "CUSTOM_MESSAGE" : "NOT_FOUND";

  const getIcon = () => {
    switch (type) {
      case "CUSTOM_MESSAGE":
        return icon || faTriangleExclamation;

      case "NOT_FOUND":
        return faMagnifyingGlass;

      default:
        return faTriangleExclamation;
    }
  };

  const getMessage = () => {
    switch (type) {
      case "CUSTOM_MESSAGE":
        return message;

      case "NOT_FOUND":
        return (
          <>
            This page was not found. Check the url and if the issue persists,{" "}
            <a href="https://github.com/bertyhell/micro-research/issues">
              create an issue here.
            </a>
          </>
        );

      default:
        return (
          <>
            Something went wrong, if this keeps happening{" "}
            <a href="https://github.com/bertyhell/micro-research/issues">
              create an issue here.
            </a>
          </>
        );
    }
  };

  return (
    <div className="c-error">
      <FontAwesomeIcon icon={getIcon()} />
      {getMessage()}
    </div>
  );
};

export default ErrorView;

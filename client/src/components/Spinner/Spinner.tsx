import React, { FC } from "react";

import "./Spinner.scss";

export interface SpinnerProps {
  size?: "page" | "inline";
}

const Spinner: FC<SpinnerProps> = ({ size = "page" }) => {
  return (
    <div className={`c-spinner c-spinner--${size}`}>
      <div className="c-loader"></div>
    </div>
  );
};

export default Spinner;

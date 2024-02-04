import { FC } from "react";

import image from "../assets/page-not-found.png";
import "./ErrorPage.css";

export const ErrorPage: FC = (): JSX.Element => {
  return (
    <div className="error-page-container">
      <div className="error-page">
        <h3 className="error-page__title">Oh nooooo!</h3>
        <img src={image} className="error-page__img" />
        <p className="error-page__text">Something went wrong.</p>
        <p className="error-page__text">Refresh the page or try page later.</p>
      </div>
    </div>
  );
};

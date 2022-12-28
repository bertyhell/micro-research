import React from "react";
import { Link } from "react-router-dom";

import "./Home.scss";

function Home() {
  return (
    <div>
      <h1>Have you always wanted to be a researcher?</h1>
      <p>
        Now is your chance. You can create mini research projects on this
        website. They consist of 2 multiple choice questions. The website tracks
        answers to the questions and determines if the questions are somehow
        related (
        <a href="https://en.wikipedia.org/wiki/Correlation_does_not_imply_causation">
          correlation
        </a>
        )?.
      </p>

      <Link className="c-button c-button--large" to="/answer">
        ANSWER SOME QUESTIONS
      </Link>

      <p>
        Examples can be:
        <ul>
          <li>
            Do you use an Android phone?
            <ul>
              <li>Yes</li>
              <li>No</li>
            </ul>
          </li>
          <li>
            Are you liberal?
            <ul>
              <li>More liberal</li>
              <li>More conservative</li>
              <li>Neither</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            How often do you eat red meat
            <ul>
              <li>Never</li>
              <li>Once a week</li>
              <li>Twice a week</li>
              <li>Three times a week</li>
              <li>4 times a week</li>
              <li>5 times a week</li>
              <li>More than 5 times a week</li>
            </ul>
          </li>
          <li>
            Have you had, or do you have cancer?
            <ul>
              <li>Yes</li>
              <li>No</li>
            </ul>
          </li>
        </ul>
        <ul>
          <li>
            Have you seen space aliens?
            <ul>
              <li>Yes</li>
              <li>No</li>
            </ul>
          </li>
          <li>
            Where do you live?
            <ul>
              <li>North America</li>
              <li>South America</li>
              <li>Europe</li>
              <li>Africa</li>
              <li>Asia</li>
              <li>Australia</li>
            </ul>
          </li>
        </ul>
      </p>
    </div>
  );
}

export default Home;

import React from "react";
import { useSelector } from "react-redux";
import "../styles/feed.css";
import "../styles/friendslist.css";
import DashHeader from "./DashHeader";
import LandingHeader from "./LandingHeader";

const DevList = () => {
    const needSignIn = useSelector(state => !state.authentication.token);

  return (
    <div className='bg'>
      {needSignIn? <LandingHeader/> : <DashHeader />}
      <div className="friendslist__container">
        <div className="friendslist">
          <h1>Developers</h1>
          <div className="friendslist__border friend">
            <div className="transaction__icon">
              <img
                className="smooth-image"
                src="https://zenmo-bucket.s3-us-west-1.amazonaws.com/developers/john.jpeg"
                alt="John Chen"
              />
            </div>
            <p>John Chen</p>
            <div>
              <a
                href="https://www.linkedin.com/in/john-chen-92714817/"
                className="footer_links"
              >
                LinkedIn{" "}
              </a>
              <a href="https://github.com/jc328" className="footer_links">
                GitHub
              </a>
            </div>
          </div>
          <div className="friendslist__border friend">
            <div className="transaction__icon">
              <img
                className="smooth-image"
                src="https://zenmo-bucket.s3-us-west-1.amazonaws.com/developers/robert.jpg"
                alt="Robert Estrada"
              />
            </div>
            <p>Robert Estrada</p>
            <div>
              <a
                href="https://www.linkedin.com/in/robertmestrada/"
                className="footer_links"
              >
                LinkedIn{" "}
              </a>
              <a
                href="https://github.com/robertestrada"
                className="footer_links"
              >
                GitHub
              </a>
            </div>
          </div>
          <div className="friendslist__border friend">
            <div className="transaction__icon">
              <img
                className="smooth-image"
                src="https://zenmo-bucket.s3-us-west-1.amazonaws.com/developers/greg.jpeg"
                alt="Greg Lloyd"
              />
            </div>
            <p>Greg Lloyd</p>
            <div>
              <a
                href="https://www.linkedin.com/in/greglloyd1/"
                className="footer_links"
              >
                LinkedIn{" "}
              </a>
              <a href="https://github.com/Greg001100" className="footer_links">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevList;

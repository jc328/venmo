import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/feed.css';
import '../styles/friendslist.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faGlobe } from '@fortawesome/free-solid-svg-icons';
// import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { getFriends } from '../actions/friends';
// import { setValErrors } from '../actions/authentication';
import TransactionForm from './TransactionForm';
import DashHeader from './DashHeader';
import LandingHeader from './LandingHeader';

const DevList = () => {

  return (
      <>
        {/* <DashHeader /> */}
        <LandingHeader />
        <div className="friendslist__container">
            <div className="friendslist">
                <h1>Developers</h1>
                <div className="friendslist__border friend">
                    <div className="transaction__icon" >
                        <img className='smooth-image' src='jc.jpg' />
                    </div>
                    <p>
                        John Chen
                    </p>
                    <div>
                        <a href="https://www.linkedin.com/in/john-chen-92714817/" className="footer_links">LinkedIn </a>
                        <a href="https://github.com/jc328" className="footer_links">GitHub</a>
                    </div>
                </div>
                <div className="friendslist__border friend">
                    <div className="transaction__icon" >
                        <img className='smooth-image' src='re.jpg' />
                    </div>
                    <p>
                        Robert Estrada
                    </p>
                    <div>
                        <a href="https://www.linkedin.com/in/robertmestrada/" className="footer_links">LinkedIn </a>
                        <a href="https://github.com/robertestrada" className="footer_links">GitHub</a>
                    </div>
                </div>
                <div className="friendslist__border friend">
                    <div className="transaction__icon" >
                        <img className='smooth-image' src='gl.jpg' />
                    </div>
                    <p>
                        Greg Lloyd
                    </p>
                    <div>
                        <a href="https://www.linkedin.com/in/greglloyd1/" className="footer_links">LinkedIn </a>
                        <a href="https://github.com/Greg001100" className="footer_links">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
      </>
  );
}

export default DevList;

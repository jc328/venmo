import React from 'react';
import Feed from './Feed';
import DashHeader from './DashHeader'
import {Link} from 'react-router-dom'


function DashBoard() {
    return (
        <>
            <DashHeader />
            <h3>Dashboard Content</h3>
            <Link to="/friends">Friends</Link>
            <Feed/>
        </>
    );
}
export default DashBoard;

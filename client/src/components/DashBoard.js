import React from 'react';
import Feed from './Feed';
import DashHeader from './DashHeader'


function DashBoard() {
    return (
        <>
            <DashHeader />
            <h3>Dashboard Content</h3>
            <Feed/>
        </>
    );
}
export default DashBoard;

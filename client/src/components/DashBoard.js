import React from 'react';
import Feed from './Feed';
import DashHeader from './DashHeader'


function DashBoard() {
    return (
        <>
            <Feed/>
            <DashHeader />
            <h3>Dashboard Content</h3>
        </>
    );
}
export default DashBoard;

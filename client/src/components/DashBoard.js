import React from 'react';
import Feed from './Feed';
import DashHeader from './DashHeader'
import Profile from './Profile'
import '../styles/dashboard.css';
import { useSelector } from 'react-redux'


function DashBoard() {
    const balance = useSelector((state) => state.authentication.user.balance)
    const username = useSelector((state) => state.authentication.user.username)
    const picture = useSelector((state) => state.authentication.user.picUrl)

    return (
        <>
            <DashHeader username={username} />
            <div className="dashboard_container">
                <div><Feed /></div>
                <div><Profile username={username} balance={balance} picture={picture}/></div>
            </div>
        </>
    );
}
export default DashBoard;

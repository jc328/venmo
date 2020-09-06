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
    const firstName = useSelector((state) => state.authentication.user.first_name)
    const lastName = useSelector((state) => state.authentication.user.last_name)

    return (
        <>
            <DashHeader/>
            <div className="dashboard_container">
                <div><Feed /></div>
                <div><Profile
                username={username}
                balance={balance}
                picture={picture}
                firstName={firstName}
                lastName={lastName}
                /></div>
            </div>
        </>
    );
}
export default DashBoard;

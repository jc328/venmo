import React from 'react';
import '../styles/profile.css';
import { Link } from 'react-router-dom';

function Profile(props) {
    const pictureURL = props.picture ? props.picture : "https://zenmo-bucket.s3-us-west-1.amazonaws.com/assets/no-image.gif"

    return (
        <>
            <div className="profile_container">
                <div className="profile_image_name">
                    <div><img className="profile_image" src={pictureURL} alt="" /></div>
                    <div className="profile_username">{props.firstName} {props.lastName}</div>
                </div>
                <div className="profile_value profile_balance_info"><div className="profile_balance">${props.balance}</div><span className="profile_zenmo"> in Zenmo</span></div>
                <div className="profile_value"><Link to='/friends'>Friends List</Link></div>
            </div>
        </>
    );
}
export default Profile;

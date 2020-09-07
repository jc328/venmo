import React from 'react';
import '../styles/profile.css';
import { Link } from 'react-router-dom';

function Profile(props) {
    const pictureURL = props.picture ? props.picture : process.env.PUBLIC_URL + 'no-image.gif'

    return (
        <>
            <div className="profile_container">
                <div className="profile_image_name">
                    <div><img className="profile_image" src={pictureURL} alt="" /></div>
                    <div className="profile_username">{props.firstName} {props.lastName}</div>
                </div>
                <p className="profile_divider" />
                <div className="profile_value">${props.balance} in Zenmo</div>
                <p className="profile_divider" />
                <div className="profile_value"><Link to='/friends'>Friends List</Link></div>
            </div>
        </>
    );
}
export default Profile;

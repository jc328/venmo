import React from 'react';
import '../styles/profile.css';

function Profile(props) {
    const pictureURL = props.picture ? props.picture : process.env.PUBLIC_URL + 'no-image.gif'
    console.log(pictureURL)

    return (
        <>
            <div className="profile_container">
                <div className="profile_image_name">
                    <div><img className="profile_image" src={pictureURL} alt="" /></div>
                    <div className="profile_username">{props.firstName} {props.lastName}</div>
                </div>
                <p className="profile_divider" />
                <div className="profile_value">${props.balance} in Venmo</div>
            </div>
        </>
    );
}
export default Profile;

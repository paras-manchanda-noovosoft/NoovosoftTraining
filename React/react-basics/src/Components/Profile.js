import React from 'react';

const Profile = function (props) {
    return (
        <>
            <div className="profile-card">
                <div className="profile-header">
                    <img src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600" alt="Profile Picture" className="profile-picture"/>
                    <h1 className="name">{props.firstName}</h1>
                </div>
                <div className="profile-body">
                    <p className="email">{props.emailAddress}</p>
                    <p className="job-role">{props.jobTitleName}</p>
                </div>
            </div>

        </>
    )
}
export default Profile;
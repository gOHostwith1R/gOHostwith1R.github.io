import React from "react";
import './info-user.css';

const InfoUser = ({userInfo}) => {
    return(
        <div className='info-user'>
            <h2>Profile info: </h2>
            <p>Selected Profile: {userInfo.firstName} {userInfo.lastName}</p>
            <p>Description: {userInfo.description}</p>
            <p>Address: {userInfo.adress.streetAddress}</p>
            <p>City: {userInfo.adress.city}</p>
            <p>State: {userInfo.adress.state}</p>
            <p>Zip: {userInfo.adress.zip}</p>
        </div>
    )
}

export default InfoUser;
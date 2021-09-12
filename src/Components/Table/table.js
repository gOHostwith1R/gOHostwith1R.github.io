import React, {useState} from "react";
import './table.css';

import { ReactComponent as Arrow } from '../../image/arrow.svg'

const Table = ({data, viewProfileInfo, sortById, sortString, term}) => {
    const [rotateId, setRotateId] = useState(false);
    const [rotateFirstName, setRotateFirstName] = useState(false);
    const [rotateLastName, setRotateLastName] = useState(false);
    const [rotateEmail, setRotateEmail] = useState(false);
    const [rotatePhone, setRotatePhone] = useState(false);
    const [rotateState, setRotateState] = useState(false);

    const rotateArrow = (element) => {
        switch (element) {
            case 'id':  setRotateId(!rotateId)
                sortById(rotateId);
                break;
            case 'firstName': setRotateFirstName(!rotateFirstName)
                sortString(rotateFirstName, 'firstName');
                break;
            case 'lastName': setRotateLastName(!rotateLastName)
                sortString(rotateLastName, 'lastName');
                break;
            case 'email': setRotateEmail(!rotateEmail)
                sortString(rotateEmail, 'email');
                break;
            case 'phone': setRotatePhone(!rotatePhone)
                sortString(rotatePhone, 'phone')
                break;
            case 'state': setRotateState(!rotateState)
                sortString(rotateState, 'state')
                break;
            default:
                break;
        }
    }
    return (
        <table className='table'>
            <thead>
            <tr>
                <th onClick={() => rotateArrow('id')}>
                    id{<Arrow className={rotateId ? 'arrow-rotate-id' : ''}/>}
                </th>
                <th onClick={() => rotateArrow('firstName')}>
                    First name{<Arrow className={rotateFirstName ? 'arrow-rotate-firstName' : ''}/>}
                </th>
                <th onClick={() => rotateArrow('lastName')}>
                    Last name{<Arrow className={rotateLastName ? 'arrow-rotate-lastName' : ''}/>}
                </th>
                <th onClick={() => rotateArrow('email')}>
                    Email{<Arrow className={rotateEmail ? 'arrow-rotate-email' : ''}/>}
                </th>
                <th onClick={() => rotateArrow('phone')}>
                    Phone{<Arrow className={rotatePhone ? 'arrow-rotate-phone' : ''}/>}
                </th>
                <th onClick={() => rotateArrow('state')}>
                    State{<Arrow className={rotateState ? 'arrow-rotate-state' : ''}/>}
                </th>
            </tr>
            </thead>
            <tbody>
             {data.map((elem) => {
                return (
                    <tr key={elem.key} className={elem.firstName.toLowerCase().trim().includes(term) ? '': 'hidden'} onClick={() => viewProfileInfo(elem.key)}>
                        <td>{elem.id}</td>
                        <td>{elem.firstName}</td>
                        <td>{elem.lastName}</td>
                        <td>{elem.email}</td>
                        <td>{elem.phone}</td>
                        <td>{elem.adress.state}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}

export default Table;
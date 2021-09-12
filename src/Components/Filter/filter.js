import React from 'react';
import './filter.css';

const Filter = ({filterState}) => {
    return (
        <select className='filter' defaultValue="" onChange={filterState}>
            <option value=''>Filter by state</option>
            <option value='WI' className='option'>WI</option>
            <option value='TN' className='option'>TN</option>
            <option value='FL' className='option'>FL</option>
            <option value='NE' className='option'>NE</option>
            <option value='IA' className='option'>IA</option>
            <option value='AR' className='option'>AR</option>
            <option value='MN' className='option'>MN</option>
        </select>
    )
}

export default Filter;
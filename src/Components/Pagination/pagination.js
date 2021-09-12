import React from "react";
import './pagination.css';

const Pagination = ({usersPerPage, totalUsers, paginate, currentPage}) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <div className="pagination-container">
            <button onClick={() => paginate((prev) => prev === 1 ? prev : prev - 1)}
                    className={currentPage === 1 ? 'disabled' : ''}
            >Previous</button>
            {pageNumbers.map(number => {
                return <button key={number} className={currentPage === number ? 'active' : ''}
                               onClick={() => paginate(number)}
                >{number}</button>
            })}
            <button onClick={() => paginate((prev) => prev >= pageNumbers.length ? prev : prev + 1)}
                    className={currentPage === pageNumbers.length ? 'disabled' : ''}
            >Next</button>
        </div>
    )
}

export default Pagination;
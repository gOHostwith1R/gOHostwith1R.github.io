import React from "react";
import './search-field.css'

const SearchField = ({search}) => {
    return (
        <form className='form-search__field' onChange={search}>
            <input form='form-search__field' placeholder='Search by name' className='input-search__field'/>
        </form>
    )
}

export default SearchField;
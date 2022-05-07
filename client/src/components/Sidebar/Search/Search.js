import React from 'react'
import './Search.css'

//material-ui import
import SearchIcon from '@material-ui/icons/Search'


const Search = (props) => {
    const { setSearchTerm } = props

    return (
        <div className='search'>
            <div className="search__container">
                <SearchIcon />
                <input
                    type='text'
                    placeholder='Search or Start new chat'
                    onChange={e => setSearchTerm(e.target.value)}
                />
            </div>
        </div>
    )
}

export default Search
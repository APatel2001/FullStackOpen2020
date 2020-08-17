import React from 'react'

const Filter = ({search, searchFunction}) => {
    return (
        <div>
            filter shown with <input value={search} onChange={searchFunction}/>
        </div>
    )
}

export default Filter
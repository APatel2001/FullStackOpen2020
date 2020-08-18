import React from 'react'

const Persons = ({original, searched, search}) => {
    return (
        <div>
            {search === '' 
                ? original.map(item => <p key={item.id}>{item.name} {item.number}</p>) 
                : searched.map(item => <p key={item.id}>{item.name} {item.number}</p>)}
        </div>
    )
}

export default Persons
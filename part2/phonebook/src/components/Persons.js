import React from 'react'

const Persons = ({original, searched, search, Delete}) => {
    
    return (
        <div>
            {search === '' 
                ? original.map(item => 
                    <p key={item.id}>
                        {item.name} {item.number} {" "}
                        <button onClick={() => {Delete(item.id)}}>delete</button>
                    </p>
                ) 
                : searched.map(item => 
                    <p key={item.id}>
                        {item.name} {item.number} {" "}
                        <button onClick={() => Delete(item.id)}>delete</button>
                    </p>
                )
            }
        </div>
    )
}

export default Persons
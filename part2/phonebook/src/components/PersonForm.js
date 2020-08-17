import React from 'react'

const PersonForm = ({entryFunction, name, nameFunction, number, numberFunction}) => {
    return (
        <form onSubmit={entryFunction}>
            <div>
                name: <input value={name} onChange={nameFunction}/>
            </div>
            <div>
                number: <input value={number} onChange={numberFunction} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm
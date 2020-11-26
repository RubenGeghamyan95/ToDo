import React from 'react';

function Tasks(props) {

    return (
        <li key={props.index}>{props.data}</li>
    )

}

export default Tasks
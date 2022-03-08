import React from "react";
import { useParams } from 'react-router-dom'

const Create = () => {
    const {id} = useParams();

    return (
        <div>
            create{id}
        </div>
    )
}

export default Create
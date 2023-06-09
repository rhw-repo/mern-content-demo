//TODO 
// analyse 
// remove test line showing id
// add CSS rules to tidy up appearance 

import { useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Edit from "./Edit";

const Read = () => {
    const { _id } = useParams();
    const { data: material, error, isPending } = useFetch(
        "/api/materials/" + _id
    );
    const [isEditing, setIsEditing] = useState(false);

    function handleUpdateClick() {
        setIsEditing(true);
    }

    function handleUpdateComplete() {
        setIsEditing(false);
    }

    return (
        <div>
            {isEditing ? (
                <Edit material={material} onUpdateComplete={handleUpdateComplete} />
            ) : (
                <div className="read">
                    <h3>Id is {_id}</h3>
                    {isPending && <div>Loading...</div>}
                    {error && <div>{error}</div>}
                    {material && (
                        <article>
                            <div className="read_title">{material.title}</div>
                            <div>{material.body}</div>
                            <div>{material.tags}</div>
                        </article>
                    )}
                    <span className="update-btn"><button onClick={handleUpdateClick}>Edit</button></span>
                </div>
            )}
        </div>
    );
}

export default Read;


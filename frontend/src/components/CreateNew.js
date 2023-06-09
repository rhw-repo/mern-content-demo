import { useState } from "react";
import { useMaterialsContext } from "../hooks/useMaterialsContext";
import { useAuthContext } from "../hooks/useAuthContext";
// if separate CreateNew into it's own page add - 
//import { useNavigate } from "react-router-dom";


const CreateNew = () => {
    const { dispatch } = useMaterialsContext()
    const { user } = useAuthContext()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
// if separate CreateNew into it's own page add -
   // const { navigate } = useNavigate()

  

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!user) {
            setError("You must be logged in")
            return
        }

        const material = { title, body, tags }

        const response = await fetch("/api/materials", {
            method: "POST",
            body: JSON.stringify(material),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle("")
            setBody("")
            setTags("")
            setError(null)
            setEmptyFields([])
            console.log('new material added', json)
            dispatch({ type: "CREATE_MATERIAL", payload: json })
        } 
// if separate CreateNew into it's own page add -
      //  navigate("/")
    }
    return (
        <form className="create" onSubmit={handleSubmit}>
            <h3>Add A New Piece Of Content Here:</h3>
            <label>Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes("title") ? "error" : ""}
            />
            <label>Paste content here:</label>
            <textarea
                //name="body"
                rows={8}
                cols={40}
                onChange={(e) => setBody(e.target.value)}
                value={body}
                className={emptyFields.includes("body") ? "error" : ""}
            />
            <label>Paste or type tags here:</label>
            <input
                type="text"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
                className={emptyFields.includes("tags") ? "error" : ""}
            />

            <button>Add New Content</button>
            {error && <div className="error">{error}</div>}
        </form>
    );
}

export default CreateNew;
///     TODO 
// upgrade to a wysiswg editor?
// create function that makes a pop up to tell user changes are saved, pass as argument line 10
// call it line 35

import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";


const Edit = ({ material }) => {
  const [title, setTitle] = useState(material.title);
  const [body, setBody] = useState(material.body);
  const [tags, setTags] = useState(material.tags);
  const { user } = useAuthContext()
  const navigate = useNavigate()

  useEffect(() => {
    setTitle(material.title);
    setBody(material.body);
    setTags(material.tags);
  }, [material]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedMaterial = { title, body, tags };
    const response = await fetch(`/api/materials/${material._id}`, {
      method: "PATCH", // or PUT
      headers: 
      { "Content-Type": "application/json", 
      "Authorization": `Bearer ${user.token}`},
      body: JSON.stringify(updatedMaterial),
    });
    if (response.ok) {
      navigate("/");
    }
  };

  return (
    <div className="edit">
      <h1>Edit This Content</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            rows={8}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label htmlFor="tags">Tags:</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Edit;

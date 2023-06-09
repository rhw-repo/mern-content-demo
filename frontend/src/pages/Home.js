import { useEffect } from "react";
import { useMaterialsContext } from "../hooks/useMaterialsContext";
import { useAuthContext } from "../hooks/useAuthContext"

// components
import MaterialDetails from "../components/MaterialDetails"
import CreateNew from "../components/CreateNew";

const Home = () => {
  const { materials, dispatch } = useMaterialsContext()
  const { user } = useAuthContext()

  // see line 2 package.json in frontend - for dev phase only, for build, point every req to endpoint 
  // template string   "Authorization": `Bearer ${user.token}` protects api routes
  useEffect(() => {
    const fetchMaterials = async () => {
      const response = await fetch('/api/materials', {
        headers: {"Authorization": `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: "SET_MATERIALS", payload: json })
      }
    }

    if (user) {
      fetchMaterials()
    }
    fetchMaterials()
  }, [dispatch, user])

  return (
    <div className="home">
      <div className="materials">
        {materials && materials.map(material => (
          <MaterialDetails key={material._id} material={material} />
        ))}
      </div>
      <CreateNew />
    </div>
  )
}

export default Home
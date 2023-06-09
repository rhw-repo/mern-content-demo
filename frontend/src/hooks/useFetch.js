import { useEffect, useState } from "react";
import { useAuthContext } from "./useAuthContext";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setisPending] = useState(null);
    const [error, setError] = useState(null);
    const { user } = useAuthContext()


    useEffect(() => {

       // console.log(user)

      fetch(url, {
        headers: {"Authorization": `Bearer ${user.token}`},
      })
      .then(response => {
        if (!response.ok) { // because error coming back from server
            throw Error("could not fetch this item");
        }
        
        if(user) { // authenticates by calling useAuthContext() by storing in variable called 'user'
            return response.json()
        }
      })
      .then(data => {
        setisPending(false)
        setData(data)
        setError(null)
      })
      .catch(err =>  {
        setisPending(false)
        setError(err.message)
      })
      }, [])

      return {
        data,
        isPending,
        error
      }
}
    
export default useFetch
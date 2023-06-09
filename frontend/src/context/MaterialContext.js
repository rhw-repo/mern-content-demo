import { createContext, useReducer } from "react";

export const MaterialsContext = createContext()

// keeps local state in sync with database 

// 1st arg reliable current state line 13, action is object line 18
export const materialsReducer = (state, action) => {
    switch (action.type) {
        case "SET_MATERIALS":
            return {
                materials: action.payload
            }
        case "CREATE_MATERIAL":
            return {
                materials: [action.payload, ...state.materials]
            }
        case "DELETE_MATERIAL":
            return {
                materials: state.materials.filter((m) => m._id !== action.payload._id)
            }
            case "UPDATE_MATERIAL":
                return {
                    materials: state.workouts.filter((m) => m._id === action.payload_id )
                }
        default:
            return state
    }
}

// use Reducer() hook invokes materialsReducer()
export const MaterialsContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(materialsReducer, {
        materials: null
    })

    // object describes desired state change (type property) and any data needed to 
    // achieve the change 
    //dispatch({type: "SET_MATERIALS", payload: [{}, {}]})
    return (
        <MaterialsContext.Provider value={{ ...state, dispatch }}>
            {children}
        </MaterialsContext.Provider>
    )
}
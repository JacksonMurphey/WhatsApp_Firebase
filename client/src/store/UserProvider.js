import React, { useReducer, useContext } from "react";

export const UserContext = React.createContext()

//Higher Order Component
export const UserProvider = (props) => {
    const { reducer, initialState } = props

    return (
        <UserContext.Provider value={useReducer(reducer, initialState)}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useStateValue = () => useContext(UserContext)


export const initialState = {
    user: null,
}

export const actionTypes = {
    SET_USER: "SET_USER",
}

const reducer = (state, action) => {
    // if(action.type === actionTypes.SET_USER){ } // This way would work too.
    console.log(action)
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user
            }
        default:
            return state
    }
}

export default reducer
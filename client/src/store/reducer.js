

export const initialState = {
    user: null,
    roomName: null,
}

export const actionTypes = {
    SET_USER: "SET_USER",
    SET_ROOM: "SET_ROOM",
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
        case actionTypes.SET_ROOM:
            return {
                ...state,
                roomName: action.roomName
            }

        default:
            return state
    }
}

export default reducer
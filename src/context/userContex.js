import * as React from 'react'

const UserContext = React.createContext();

function userReducer(state, action) {
    switch (action.type) {
        case 'change_user_name': {
            return {userName: action.userName}
        }
        default: {
            throw new Error(`Unhandled action type: ${action.type}`)
        }
    }
}

function UserProvider({children}) {
    const [state, dispatch] = React.useReducer(userReducer, {"userName": ""});
    const value = {state, dispatch};
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

function useUser() {
    const context = React.useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a CountProvider')
    }
    return context
}

export {UserProvider, useUser}

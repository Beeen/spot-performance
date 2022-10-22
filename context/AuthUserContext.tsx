// import React from 'react';
import React, { useState, createContext } from 'react';
import { AuthUserContextType } from 'types';


export const AuthUserContext = createContext<AuthUserContextType | undefined>(undefined);

type Action =
 | { type: 'LOADING_FINISHED'}
 | { type: 'SET_USER_UID', userId: string}
 | { type: 'SIGN_OUT'};
interface Props {
    children: React.ReactNode;
}  
const AuthUserProvider: React.FC<Props> = ({ children }) => {
    const [isLoading, setLoading] = useState<boolean>(true)
    const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
    const [isProfileLoaded, setIsProfileLoaded] = useState<boolean>(false)
    const [userId, setUser] = useState<string>('')


    const onLoadingFinished = () => {
        console.log('On Loading Finished')
        setLoading(false)
        dispatch({ type: 'LOADING_FINISHED' })
    };

    const onSignOut = () => {
        console.log('On Signed Out')
        setLoading(true)
        dispatch({ type: 'SIGN_OUT' })
    };

    const setUserId = (uid: string) => {
        console.log('Retrieved user\'s firebase UID: ' + uid)
        setUser(uid)
        dispatch({ type: 'SET_USER_UID', userId: uid })
    }

    const [state, dispatch] = React.useReducer(
    (prevState: any, action: Action) => {
        switch (action.type) {
        case 'LOADING_FINISHED':
            return {
            ...prevState,
            isLoading: false,
            };
        case 'SET_USER_UID':
            return {
            ...prevState,
            userId: action.userId,
            };
        case 'SIGN_OUT':
            return {
            ...prevState,
            isLoading: true,
            userToken: null,
            };
        }
    },
    {
        isLoading: true,
        userId: null,
    }
    );

    return (
    <AuthUserContext.Provider value={{
        isLoading,
        isSignedIn,
        isProfileLoaded,
        userId,
        onLoadingFinished,
        onSignOut,
        setUserId
    }}>
        {children}
    </AuthUserContext.Provider>
    );
}

export default AuthUserProvider;

import React from 'react';

export default AuthUserContext = React.createContext({
    isLoading: true,
    isSignedIn: false,
    isProfileLoaded: false,
    userId: '',
    onLoadingFinished: () => {}
});
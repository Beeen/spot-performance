//import { Component } from 'ionicons/dist/types/stencil-public-runtime';
import React, { useState, createContext } from 'react';
import AuthUserContext from './AuthUserContext';

export default function AuthUserProvider({children}) {

  // state = {
  //   isLoading: true,
  //   userId: null,
  // }

  const onLoadingFinished = () => {
    console.log('On Loading Finished')
    //this.setState({isLoading:false});
    dispatch({ type: 'LOADING_FINISHED' })
  };

  const onSignOut = () => {
    console.log('On Signed Out')
    //this.setState({isLoading:true});
    dispatch({ type: 'SIGN_OUT' })
  };

  const setUserId = (uid) => {
    console.log('Retrieved user\'s firebase UID: ' + uid)
    //this.setState({userId:uid});
    dispatch({ type: 'SET_USER_UID', userId: uid })
  }

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
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

  // const authContext = React.useMemo(
  //   () => ({
  //     onLoadingFinished: () => dispatch({ type: 'LOADING_FINISHED' }),
  //     signOut: () => dispatch({ type: 'SIGN_OUT' }),
  //     setUserId: (userId) => dispatch({ type: 'SET_USER_UID', userId: userId })
  //   }),
  //   []
  // );

  return (
    <AuthUserContext.Provider value={{
      isLoading: state.isLoading,
      isSignedIn: state.isSignedIn,
      isProfileLoaded: state.isProfileLoaded,
      userId: state.userId,
      onLoadingFinished: onLoadingFinished,
      onSignOut: onSignOut,
      setUserId: setUserId
    }}>
      {children}
    </AuthUserContext.Provider>
  );

  // render() {
  //   return (
  //     <AuthUserContext.Provider
  //       value={{
  //         isLoading: this.state.isLoading,
  //         isSignedIn: this.state.isSignedIn,
  //         isProfileLoaded: this.state.isProfileLoaded,
  //         userId: this.state.userId,
  //         onLoadingFinished: this.onLoadingFinished,
  //         onSignOut: this.onSignOut,
  //         setUserId: this.setUserId
  //       }}
  //     >
  //       {this.props.children}
  //     </AuthUserContext.Provider>
  //   );
  // }
}
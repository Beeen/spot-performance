// import React from 'react';
import React from 'react';
import { AuthUserContextType } from 'types';
// import AuthUserProvider from './AuthUserProvider';

// export const AuthUserContext = React.createContext<AuthUserContextType | undefined>(
//     undefined
// );

export const AuthUserContext = React.createContext<AuthUserContextType>({
    isLoading: true,
    isSignedIn: false,
    isProfileLoaded: false,
    userId: '',
    onLoadingFinished: () => {}
});

// import * as React from 'react';

// interface Props {
//     children: React.ReactNode;
// }

// import { AuthUserContextType } from 'types';

// export const AuthUserContext = React.createContext<AuthUserContextType | null>(null);

// const AuthUserProvider: React.FC<Props> = ({ children }) => {
  
//     // state = {
//   //   isLoading: true,
//   //   userId: null,
//   // }

//   const onLoadingFinished = () => {
//     console.log('On Loading Finished')
//     //this.setState({isLoading:false});
//     dispatch({ type: 'LOADING_FINISHED' })
//   };

//   const onSignOut = () => {
//     console.log('On Signed Out')
//     //this.setState({isLoading:true});
//     dispatch({ type: 'SIGN_OUT' })
//   };

//   const setUserId = (uid: string) => {
//     console.log('Retrieved user\'s firebase UID: ' + uid)
//     //this.setState({userId:uid});
//     dispatch({ type: 'SET_USER_UID', userId: uid })
//   }

//   const [state, dispatch] = React.useReducer(
//     (prevState, action) => {
//       switch (action.type) {
//         case 'LOADING_FINISHED':
//           return {
//             ...prevState,
//             isLoading: false,
//           };
//         case 'SET_USER_UID':
//           return {
//             ...prevState,
//             userId: action.userId,
//           };
//         case 'SIGN_OUT':
//           return {
//             ...prevState,
//             isLoading: true,
//             userToken: null,
//           };
//       }
//     },
//     {
//       isLoading: true,
//       userId: null,
//     }
//   );

//   // const authContext = React.useMemo(
//   //   () => ({
//   //     onLoadingFinished: () => dispatch({ type: 'LOADING_FINISHED' }),
//   //     signOut: () => dispatch({ type: 'SIGN_OUT' }),
//   //     setUserId: (userId) => dispatch({ type: 'SET_USER_UID', userId: userId })
//   //   }),
//   //   []
//   // );

//   return (
//     <AuthUserContext.Provider value={{
//       isLoading: state.isLoading,
//       isSignedIn: state.isSignedIn,
//       isProfileLoaded: state.isProfileLoaded,
//       userId: state.userId,
//       onLoadingFinished: onLoadingFinished,
//       onSignOut: onSignOut,
//       setUserId: setUserId
//     }}>
//       {children}
//     </AuthUserContext.Provider>
//   );
// };

// export default AuthUserProvider;

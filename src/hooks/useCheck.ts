import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

import { FirebaseAuth } from '../firebase/config';
import { onLogin, onLogout } from '../store/auth/authSlice';
import { useAppDispatch, useAppSelector } from './dispatch';



export const useCheckAuth = () => {
  
    const { status } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();

    useEffect(() => {
        
        onAuthStateChanged( FirebaseAuth, async( user ) => {
            if ( !user ) return dispatch( onLogout({errorMessage: 'Error de login'}) );

            const { uid, email, displayName, photoURL } = user;
            dispatch( onLogin({user:{ uid, email, displayName, photoUrl :photoURL }, status}) );
        })
    }, []);

    return status;
}
import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import initializeFirebaseAuthentication from '../Firebase/firebase.initialize';

initializeFirebaseAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState( {} );
    const [ error, setError ] = useState( '' );

    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup( auth, googleProvider )
            .then( result => {
                setUser( result.user );
            } )
            .catch( error => {
                setError( error.message );
            } )
    }

    useEffect( () => {
        onAuthStateChanged( auth, user => {
            if ( user ) {
                console.log( 'inside state change', user );
                setUser( user );
            }
        } )
    }, [] );

    return {
        user,
        error,
        signInUsingGoogle
    }
}

export default useFirebase;
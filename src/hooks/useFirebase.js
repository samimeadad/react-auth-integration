import { useEffect, useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import initializeFirebaseAuthentication from '../Firebase/firebase.initialize';

initializeFirebaseAuthentication();

const useFirebase = () => {
    const [ user, setUser ] = useState( {} );
    const [ error, setError ] = useState( '' );

    const auth = getAuth();

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider();

    const signInUsingGoogle = () => {
        signInWithPopup( auth, googleProvider )
            .then( result => {
                setUser( result.user );
            } )
            .catch( error => {
                setError( error.message );
            } );
    }

    const signInUsingGithub = () => {
        signInWithPopup( auth, githubProvider )
            .then( result => {
                setUser( result.user );
            } )
            .catch( error => {
                setError( error.message );
            } );
    }

    const logout = () => {
        signOut( auth ).then( () => {
            setUser( {} );
        } )
            .catch( ( error ) => {
                setError( error.message );
            } );
    }

    useEffect( () => {
        onAuthStateChanged( auth, user => {
            if ( user ) {
                console.log( 'inside state change', user );
                setUser( user );
            }
        } )
    }, [ auth ] );

    return {
        user,
        error,
        signInUsingGoogle,
        signInUsingGithub,
        logout
    }
}

export default useFirebase;

import {initializeApp} from 'firebase/app';
import {
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider
} from 'firebase/auth'

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAoGYvbfzKX8dy5ujhKM2iTsFn0N1sh9S8",
    authDomain: "best-clothing-db-9908f.firebaseapp.com",
    projectId: "best-clothing-db-9908f",
    storageBucket: "best-clothing-db-9908f.appspot.com",
    messagingSenderId: "399443599577",
    appId: "1:399443599577:web:caa5f7832f49a535c8dec8"
  };
  
  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  })
  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup (auth, provider);

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);
    console.log(userDocRef)
    const userSnapshot = await getDoc(userDocRef)
    console.log(userSnapshot);
    console.log(userSnapshot.exists())

    // if user data does not exist
      if(!userSnapshot.exists()){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
          await setDoc(userDocRef,{
            displayName,
            email,
            createdAt
          });
        } catch(error){
          console.log('error creating the user', error.message);

        }

      }

      return userDocRef;



    // create/set the document with the data from userAuth in my collection

    // if user data exists, 

    // return userDocRef

  };

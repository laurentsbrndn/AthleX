import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {env} from "./env";
import {getFirestore} from 'firebase/firestore'
import { getFunctions } from "firebase/functions";

const firebaseConfig = {
    apiKey: env.apiKey,
    authDomain: env.authDomain,
    projectId: env.projectId,
    storageBucket: env.storageBucket,
    messagingSenderId: env.messagingSenderId,
    appId: env.appId,
    measurementId: env.measurementId
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const functions = getFunctions(app); 
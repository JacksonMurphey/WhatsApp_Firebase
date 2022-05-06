// import firebase from 'firebase/compat/app'
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAQ2Zwzu0Sc7xeZyCMdogaRqx68nZjE314",
    authDomain: "whatsapp-mern-83edd.firebaseapp.com",
    projectId: "whatsapp-mern-83edd",
    storageBucket: "whatsapp-mern-83edd.appspot.com",
    messagingSenderId: "422965994372",
    appId: "1:422965994372:web:353c28df9ce853cbea73d1"
};

const firebaseApp = initializeApp(firebaseConfig)
const db = getFirestore(firebaseApp)
const auth = getAuth(firebaseApp)

const provider = new GoogleAuthProvider()




export { auth, provider }
export default db

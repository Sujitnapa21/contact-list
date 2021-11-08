
import firebase from 'firebase/compat/app'
import 'firebase/compat/database'

const firebaseConfig = {
  apiKey: "AIzaSyDwPwcUVNO-1vfg0xvboJY5Aktr8rtnkrw",
  authDomain: "react-contact-c1a75.firebaseapp.com",
  projectId: "react-contact-c1a75",
  storageBucket: "react-contact-c1a75.appspot.com",
  messagingSenderId: "1030129797441",
  appId: "1:1030129797441:web:06ea9f857147ed485779c0",
};


const fireDb = firebase.initializeApp(firebaseConfig);
export default fireDb.database().ref();
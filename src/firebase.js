 import firebase from 'firebase';
 
 // Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyCs9IXMQzHine0WM1wtFrTnd-oMWJnKJvI",
  authDomain: "my-time-buddy.firebaseapp.com",
  databaseURL: "https://my-time-buddy.firebaseio.com",
  projectId: "my-time-buddy",
  storageBucket: "my-time-buddy.appspot.com",
  messagingSenderId: "245275941958",
  appId: "1:245275941958:web:948e02286deb3496"
};

// Initialize Firebase
const fire = firebase.initializeApp(firebaseConfig);

export default fire;



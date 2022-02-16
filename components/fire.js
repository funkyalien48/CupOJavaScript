import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyCXi33c0BFCA-IMv6jVSOkir86liMYfjzE",
  authDomain: "weight-exchange-app.firebaseapp.com",
  databaseURL: "https://weight-exchange-app-default-rtdb.firebaseio.com",
  projectId: "weight-exchange-app",
  storageBucket: "weight-exchange-app.appspot.com",
  messagingSenderId: "983057436016",
  appId: "1:983057436016:web:15710452de79f85376d3b5",
  measurementId: "G-R8H0JNCDKC"
};
  
  const fire = firebase.initializeApp(firebaseConfig)

  // if firebase is not loaded initialize it
  //if(firebase.apps.length === 0) 
  //{
    //fire = firebase.initializeApp(firebaseConfig)
  //}

  export default fire;

const config = {
    apiKey: "AIzaSyDNnBppD7Og-qR_IISLCwnvrd-Vlc9nHDk",
    authDomain: "instagram-clone-61eb9.firebaseapp.com",
    projectId: "instagram-clone-61eb9",
    storageBucket: "instagram-clone-61eb9.appspot.com",
    messagingSenderId: "248896703771",
    appId: "1:248896703771:web:f81eaf8ef6924e6e6e17be"
}

const firebase = window.firebase.initializeApp(config);
const { FieldValue } = window.firebase.firestore;


export {firebase, FieldValue}
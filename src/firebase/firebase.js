
import { initializeApp } from "firebase/app";

import {getFirestore} from "firebase/firestore"

const firebaseConfig={
   
        apiKey: "AIzaSyDkDB0jpM_0ef5T00RZZB2yWFE2sEBfc74",
        authDomain: "despensa-c8032.firebaseapp.com",
        projectId: "despensa-c8032",
        storageBucket: "despensa-c8032.appspot.com",
        messagingSenderId: "568260298771",
        appId: "1:568260298771:web:dea106294d7e3987f897e6",
        measurementId: "G-RDDZZZXBC6"
   

}


const app = initializeApp(firebaseConfig);  

  export const db = getFirestore(app);
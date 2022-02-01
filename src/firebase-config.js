import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyByJYxTHuWQQtA2LI52jGTIwevBD3JHjSU',
	authDomain: 'workout-tracker-65a67.firebaseapp.com',
	projectId: 'workout-tracker-65a67',
	storageBucket: 'workout-tracker-65a67.appspot.com',
	messagingSenderId: '314571644951',
	appId: '1:314571644951:web:7e590e385a2382643a7c52',
};

console.log('hej');

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

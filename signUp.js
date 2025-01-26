import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile, signInWithRedirect, getRedirectResult } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-auth.js";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgyWGXCAIR6NiKfkzkWZbBeOMPRDNwMg4",
    authDomain: "contactus-a9d19.firebaseapp.com",
    databaseURL: "https://contactus-a9d19-default-rtdb.firebaseio.com",
    projectId: "contactus-a9d19",
    storageBucket: "contactus-a9d19.firebasestorage.app",
    messagingSenderId: "290565306453",
    appId: "1:290565306453:web:0995f78c2a17d582903cdc"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
auth.languageCode = 'en';



let button = document.getElementById("authh");

//تسجيل الدخول باستخدام Google
let googleButton = document.getElementById("google-signin");
googleButton.addEventListener('click', () => {
signInWithPopup(auth, provider) //تنفيذ تسجيل الدخول باستخدام نافذة منبثقة
        .then((result) => {//. التعامل مع النتيجة إذا نجحت المصادقة
           const credential = GoogleAuthProvider.credentialFromResult(result);//يتم استخراج بيانات الاعتماد الخاصة  Google 
            const token = credential.accessToken;
            const user = result.user;//كائن يحتوي على معلومات المستخدم (مثل البريد الإلكتروني، الاسم، الصورة الشخصية...).
            const auth = getAuth();
            signInWithRedirect(auth, provider);
        })
        
        .catch((error) => {//إذا حدث خطأ أثناء عملية المصادقة
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email; 
            const credential = GoogleAuthProvider.credentialFromError(error);
         
        });

});

// تسجيل المستخدم الجديد باستخدام البريد الإلكتروني وكلمة المرور
button.addEventListener('click', function (event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const terms = document.getElementById('terms').checked;




                 //regex
    const nameRegex = /^[A-Za-z\s]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!nameRegex.test(name)) {
        alert('Please enter a valid name (3-30 characters).');
        return;
    }
    else if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    else if (!passwordRegex.test(password)) {
        alert('Password must be at least 8 characters long and include both letters, numbers and at least one special character.');
        return;
    }
    else if (!terms) {
        alert('You must agree to the terms and policy.');
        return;
    }
    else {
        let i = 5;
        alert('Form submitted successfully!');



               //إنشاء حساب جديد
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                localStorage.setItem("username", name);
                window.location.href = "index.html";
                alert("Creating the user account");
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage);
                // ..
            });}





            // تحديث واجهة المستخدم بناءً على حالة تسجيل الدخول
    onAuthStateChanged(auth, (user) => {
        const navUsername = document.getElementById('nav-username');
        if (user) {
            console.log("User is signed in:", user);
            if (navUsername) {
                navUsername.textContent = `Welcome, ${displayName}`;
            }
        } else {
            console.log("No user is signed in.");
            if (navUsername) {
                navUsername.textContent = "Welcome, Guest";
            }
        }
    });





})








// //regix
// function validateForm() {
//     const name = document.getElementById('name').value;
//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;
//     const terms = document.getElementById('terms').checked;



//     const nameRegex = /^[A-Za-z\s]{3,30}$/;
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

//     if (!nameRegex.test(name)) {
//         alert('Please enter a valid name (3-30 characters).');
//         return;
//     }

//     else if (!emailRegex.test(email)) {
//         alert('Please enter a valid email address.');
//         return;
//     }

//     else if (!passwordRegex.test(password)) {
//         alert('Password must be at least 8 characters long and include both letters, numbers and at least one special character.');
//         return;
//     }

//     else if (!terms) {
//         alert('You must agree to the terms and policy.');
//         return;
//     }
//     else {
//         alert('Form submitted successfully!');



//     }

// }
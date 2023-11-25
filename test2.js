// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBbhNdQa2sn_uGqWYhNZcS8PRwoI0x1ook",
  authDomain: "portfoliodatabase-27998.firebaseapp.com",
  databaseURL:
    "https://portfoliodatabase-27998-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portfoliodatabase-27998",
  storageBucket: "portfoliodatabase-27998.appspot.com",
  messagingSenderId: "485104666349",
  appId: "1:485104666349:web:7327325c77127183d7eee4",
  measurementId: "G-FSXNF4C33Q",
};
// Initialize Firebase
// firebase.analytics();
firebase.initializeApp(firebaseConfig);
// firebase.auth.Auth.Persistence.SESSION;

// Initialize variables

const auth = firebase.auth();
const database = firebase.database();
const postsDisplay = document.getElementById("postsDisplay");
const logOutbtn = document.getElementById("logOutbtn");
const RegBTN = document.getElementById("RegBTN");
const logInbtn = document.getElementById("logInbtn");
const LogInWarning = document.getElementById("LogInWarning");
const HideContent = document.getElementById("HideContent");

const currentTimestamp = Date.now();
const readableTimestamp = new Date(currentTimestamp).toISOString();

function validateEmail(email) {
  return /^[^@]+@\w+(\.\w+)+\w$/.test(email);
}

function validatePassword(password) {
  return password.length >= 6;
}

function validateField(field) {
  return field != null && field.length > 0;
}

function register() {
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validateField(firstName) ||
    !validateField(lastName)
  ) {
    swal("Invalid input!");
    return;
  }

  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = database.ref("users/" + user.uid);

      const user_data = {
        email,
        firstName,
        lastName,
        regDateTime: readableTimestamp,
        last_login: readableTimestamp,
        last_logout: readableTimestamp,
      };

      userRef.set(user_data);
      swal({ text: "Account created!", icon: "success", timer: 2000 });
      setTimeout(() => window.location.replace("/Posts.html"), 2000);
    })
    .catch((error) => alert(error.message));
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!validateEmail(email) || !validatePassword(password)) {
    swal("Invalid email or password!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const userRef = database.ref("users/" + user.uid);

      userRef.update({ last_login: readableTimestamp });
      swal({ text: "Logged In!", icon: "success", timer: 2000 });
      setTimeout(() => (window.location = "/Posts.html"), 2000);
    })
    .catch((error) => alert(error.message));
}

function logout() {
  const user = auth.currentUser;
  if (user) {
    auth.signOut();
    database
      .ref(`users/${user.uid}`)
      .update({ last_logout: readableTimestamp });
    swal({ text: "Logged Out!", icon: "success" });
    window.location = "/Public/Social-Log/signIN.html";
  }
}

auth.onAuthStateChanged((user) => {
  if (user) {
    [logInbtn, RegBTN, LogInWarning].forEach(
      (elem) => (elem.style.display = "none")
    );
    logOutbtn.style.display = "block";
  } else {
    postsDisplay.style.display = "none";
    logOutbtn.style.display = "none";
  }
  if (!user) logOutbtn.style.display = "none";
  if (user) HideContent.style.display = "none";
});

// rest of your functions...

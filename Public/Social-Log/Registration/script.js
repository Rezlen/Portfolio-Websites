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
logOutbtn.style.display = "none";  // as defult, does not display the logout button so it can display it when is needed
const RegBTN = document.getElementById("RegBTN");
const logInbtn = document.getElementById("logInbtn");
const LogInWarning = document.getElementById("LogInWarning");
const HideContent = document.getElementById("HideContent");
//  below 2 ceriable are for displaying the timestamp in Firebase, in a readable strings
const currentTimestamp = Date.now();
const readableTimestamp = new Date(currentTimestamp).toISOString();


///////////////////////////////////Registration Section///////////////////////////////

// Validate input fields
function validateEmail(email) {
  return /^[^@]+@\w+(\.\w+)+\w$/.test(email);
}
  // Firebase only accepts lengths greater than 6
function validatePassword(password) {
  return password.length >= 6;
}

function validateField(field) {
  return field != null && field.length > 0;
}
// Set up our register function
function register() {
  // Access all our input fields and make it available to use as a CONST variable
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  // uses the validating function here to check if the entered input are VALID
  if (
    !validateEmail(email) ||
    !validatePassword(password) ||
    !validateField(firstName) ||
    !validateField(lastName)
  ) {
    swal("One or More Extra Fields is Outta Line!!");
    return;
  }
  // If entry format not in the right format don't continue running the code otherwise:

  // Then move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Declaring user variable by its credential
      const user = userCredential.user;
      // Add this user's details to Firebase Database
      const userRef = database.ref("users/" + user.uid);

      // Create User data as following
      const user_data = {
        email,
        firstName,
        lastName,
        regDateTime: readableTimestamp,
        last_login: readableTimestamp,
        last_logout: readableTimestamp,
      };

      // after successful data registration, display the following message on SWAL popups
      userRef.set(user_data);
      swal({
        text: "Great, Your Account Created!!",
        icon: "success",
        timer: 2000,
      });
      // function created only to create a delay for moving to the POSTS.html page so the SUCCESS alert/swal is visible well!
      setTimeout(() => window.location.replace("/Posts.html"), 2000);
    })
    // Firebase will use this to alert of its errors
    .catch((error) => alert(error.message));
}

///////////////////////////////////Login Section///////////////////////////////
// Set up our login function
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  // Validate input fields to allow logging in
  if (!validateEmail(email) || !validatePassword(password)) {
    swal("Email or Password is NOT Correct, try again!!");
    return;
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // Declaring user variable
      const userRef = database.ref("users/" + user.uid);

      // Add this user login timeStamp, in a readable format to Firebase Database
      userRef.update({ last_login: readableTimestamp });
      swal({ text: "You are Logged-In Now!!", icon: "success", timer: 2000 });
      setTimeout(() => (window.location = "/Posts.html"), 2000);
    })
    .catch((error) => alert(error.message));
  // Firebase will use this to alert of its errors
}
  
function logout() {
  const user = auth.currentUser;
  if (user) {
    auth.signOut();
    database
      .ref(`users/${user.uid}`)
      .update({ last_logout: readableTimestamp });
    swal({ text: "You are Logged-Out Now!!", icon: "success" });
    setTimeout(() => (window.location = "/Public/Social-Log/signIN.html"), 2000);
  }
}

// conditions for when user is/not logged in, display or not display some buttons or pages
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

  // hide the Registration & Logout button fields is the user is logged in already

  if (!user) logOutbtn.style.display = "none";
  if (user) HideContent.style.display = "none";
});

// rest of your functions...

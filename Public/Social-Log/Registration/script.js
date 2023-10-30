// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBbhNdQa2sn_uGqWYhNZcS8PRwoI0x1ook",
  authDomain: "portfoliodatabase-27998.firebaseapp.com",
  databaseURL: "https://portfoliodatabase-27998-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "portfoliodatabase-27998",
  storageBucket: "portfoliodatabase-27998.appspot.com",
  messagingSenderId: "485104666349",
  appId: "1:485104666349:web:7327325c77127183d7eee4",
  measurementId: "G-FSXNF4C33Q",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth();
const database = firebase.database();

///////////////////////////////////Registration Section///////////////////////////////

// Set up our register function
function register() {
  // Get all our input fields
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    swal("Email or Password is NOT Correct!!");
    return;
    // Don't continue running the code
  }
  if (validate_field(firstName) == false || validate_field(lastName) == false) {
    swal("One or More Extra Fields is Outta Line!!");
    return;
  }

  // Move on with Auth
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).set(user_data);

      // Done. Instead of ALERT popup SweetAlert "swal" Has been used, 
      swal({ text: "Thank you, Your Account Created!!", icon: "success", timer: 2000 });
      console.log(user_data) // checking the users success & data on console

      function intervalFunction() { // function created only to create a delay for moving to the POSTS.html page so the SUCCESS alert/swal is visible well!
        if (user) {
          window.location.replace = "/Posts.html"; //After successful login, user will be redirected to Posts.html
        }
      }
      setInterval(intervalFunction, 2000);
    }) 

    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message, error_code);
    });
}
///////////////////////////////////Login Section///////////////////////////////
// Set up our login function
function login() {
  // Get all our input fields
  email = document.getElementById("email").value;
  password = document.getElementById("password").value;
  postsDisplay = document.getElementById("authContentId");

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    swal("Email or Password is NOT Correct!!");
    return;
    // Don't continue running the code
  }

  auth
    .signInWithEmailAndPassword(email, password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now(),
      };

      // Push to Firebase Database
      database_ref.child("users/" + user.uid).update(user_data);

      // Done
      swal({ text: "You are Logged-In Now!!", icon: "success", timer: 2000 });
      console.log(user_data); // checking the users success & data on consol

      function intervalFunction() {
        // function created only to create a delay for moving to the POSTS.html page so the SUCCESS alert/swal is visible well!
        if (user) {
          window.location = "/Posts.html"; //After successful login, user will be redirected to Posts.html
        }
      }
      setInterval(intervalFunction, 2000);

      // function test() {
      // auth.onAuthStateChanged(auth, user=> {
      //   if (auth.user) {
      //     postsDisplay.style.display = "none";
      //     } else {
      //     postsDisplay.style.display = "block";
      //     }
      //   });
      // }
      // test()

    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message, error_code);
    });  
}


//   postsDisplay = document.getElementById("authContentId");
// // function getinnerHTML() {
//   postsDisplay.style.display='none';
// // }
// // getinnerHTML()


function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/;
  if (expression.test(email) == true) {
    // Email is good
    return true;
  } else {
    // Email is not good
    return false;
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false;
  } else {
    return true;
  }
}

function validate_field(field) {
  if (field == null) {
    return false;
  }

  if (field.length <= 0) {
    return false;
  } else {
    return true;
  }
}

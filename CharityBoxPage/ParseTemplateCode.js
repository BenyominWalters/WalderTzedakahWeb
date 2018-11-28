signUp();

function signUp() {
    // Create a new instance of the user class
    var user = new Parse.User();
    user.set("username", "my name");
    user.set("password", "my pass");
    user.set("email", "email@example.com");

    // other fields can be set just like with Parse.Object
    user.set("total", "1026");
    user.set("charityName", "Walder Education");
    user.set("charityEmail", "teacherscenter@waldereducation.org");
    user.set("fullAmount", "1800");

    user.signUp(null, {
      success: function(user) {
        console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
      },
      error: function(user, error) {
        // Show the error message somewhere and let the user try again.
        // It is likely that the user is trying to sign with a username or email already taken.
        console.log("Error: " + error.code + " " + error.message);
      }
    });
}

login();

function login() {
    Parse.User.logIn("my name", "my pass", {
        success: function(user) {
            // Do stuff after successful login, like a redirect.
            console.log('User logged in successful with username: ' + user.get("username") + ' and email: ' + user.get("email"));
        },
        error: function(user, error) {
            console.log("The login failed with error: " + error.code + " " + error.message);
        }
    });
}

resetPassword();

function resetPassword() {
    Parse.User.requestPasswordReset("email@example.com", {
        success: function() {
            console.log("Password reset request was sent successfully");
        },
        error: function(error) {
            console.log("The login failed with error: " + error.code + " " + error.message);
        }
    });
}

Parse.User.enableUnsafeCurrentUser() // Call if disabled by default (for Node.js like React)

var currentUser = Parse.User.current();
if (currentUser) {
    // do stuff with the user
} else {
    // show the signup or login page
}

var currentUser = Parse.User.current();
currentUser.set('name', 'New Name');
currentUser.save(null, {
    success: function(user) {
        currentUser.fetch();
    },
    error: function(user, error) {
        alert('Failed to update object, with error code: ' + error.message);
    }
});

Parse.User.logOut().then(() => {
    var currentUser = Parse.User.current();  // this will now be null
  });
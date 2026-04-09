//error handles error messages that firebase could throw (used for login/sign up)
export const getFirebaseErrorMessage = (error) => {
    switch (error.code) {
        case "auth/email-already-in-use":
            return "This email is already registered. Try logging in.";
        case "auth/invalid-email":
            return "Please enter a valid email.";
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
            return "Invalid email or password.";
        case "auth/missing-email":
            return "Please enter your email address.";
        case "auth/missing-password":
            return "Please enter your password.";
        default:
            // console.log("Firebase error code:", error.code);
            return "Something went wrong. Please try again.";
    }
};
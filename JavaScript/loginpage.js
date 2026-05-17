function login(){
    // checks if the username and email is in the local storage
    let user_name = document.getElementById("username").value;
    let user_email = document.getElementById("user_email").value;
    

    
    if(localStorage[user_email] === undefined){
        alert("you dont have an account");
        return;
    } else {
        // gets the email from the local storage
        let userObj = JSON.parse(localStorage[user_email]);
        let userPassword = document.getElementById("userPassword").value;

        if(userPassword === userObj.userPassword) {
            sessionStorage.setItem('loggedInUsrEmail', userObj.user_name);
            localStorage.setItem('user_name', userObj.user_name);
            localStorage.setItem('loggedIn', 'true');
            alert("Logged in");
        } else{
            alert("password or username is incorrect");
        }

    }

}

// sign out function
function signout(){
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
        alert("You are already logged out.");
        return; 
    }
    
    localStorage.setItem('loggedIn', 'false');
    alert("Signed Out Sucessfully");
}





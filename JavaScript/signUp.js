let feedBack = document.getElementById('messages');
let submit_button = document.getElementById('loginButton');
// event listeners
document.getElementById("userPassword").addEventListener("input", checkPassword);
document.getElementById("username").addEventListener("input", checkUsername);
document.getElementById("confirmPassword").addEventListener("input",checkPassword );
document.getElementById("user_email").addEventListener("input", checkEmail);

// password validation

function checkPassword(){
    //getting the password values
    let user_password = document.getElementById("userPassword").value;
    let confirm_Password = document.getElementById('confirmPassword').value;
    let invaild_messages = [];
    
    submit_button.disabled = false;
// checks if the user has left the feild empty
    if(user_password === ""){
        invaild_messages.push("This field is required")
        submit_button.disabled = true;
    } else{
        // less than 8 characters
        if(user_password.length < 8){
            invaild_messages.push("Your password is too short");
            submit_button.disabled = true;
            
        } // lower case 
        if(!/[a-z]/.test(user_password)){
            invaild_messages.push("Your password must contain at least one lowercase letter");
            submit_button.disabled = true;
        }
        // uppercase
        if(!/[A-Z]/.test(user_password)){
            invaild_messages.push("Your password must contain at least one uppercase letter");
       
            submit_button.disabled = true;
        }
        //number
        if(!/[0-9]/.test(user_password)){
            invaild_messages.push("Your password must contain at least one number letter");
            submit_button.disabled = true;
        }
        
    //checks if the passwords match
        if(user_password != confirm_Password){
           invaild_messages.push("Passwords do not match");
            submit_button.disabled = true;
        }
    
    
    }

    // changes the cursor if the button is diabled
    if(submit_button.disabled === true){
        document.getElementById("loginButton").style.cursor = "default";
    }
        
    else {
        document.getElementById("loginButton").style.cursor = "pointer";
        }
        
    // displays all the invalid messages
    feedBack.innerHTML = invaild_messages.join('<br>');
    
    let confirm_password = document.getElementsByClassName("confirm_password")[0];
    let container = document.getElementsByClassName('container')[0];
    let login_link = document.getElementById('login_link')

    if(invaild_messages.length > 1) {
       // adjusts the height of the container so it doesnt over lap
        let totalMargin = invaild_messages.length * 22;
        confirm_password.style.marginTop = totalMargin + "px";
        container.style.height = "600px";
        login_link.style.bottom = '0.5%';
        
    }else{

        confirm_password.style.marginTop = "23px"; 
        container.style.height = "570px";
        login_link.style.bottom = '4%';
    }

    invaild_messages.forEach(index => {
        invaild_messages[index].style.marginTop = "10px";
    });

}


function checkUsername(){
    //stores invalid user messages
    let user_messages = []
    let user_name = document.getElementById("username").value;
    submit_button.disabled = false;

// if the user leaves it empty
if(user_name === ""){
    user_messages.push("This field is required");
    submit_button.disabled = true;
}else{
    //checks the lenght
    if(user_name.length < 3){
        user_messages.push("Your username is too short");
        submit_button.disabled = true;
    }
    
    //checks if it exists
    if(localStorage[user_name] !== undefined){
        user_messages.push("username already exist");
        submit_button.disabled = true; 
    }

    if(/^[0-9]/.test(user_name)){
        user_messages.push("Username should not begin with a number");
        submit_button.disabled = true;
    }

    if(/[^a-zA-Z0-9_]/.test(user_name)) {
        user_messages.push("Username can only contain '_' not other special characters");
        submit_button.disabled = true;
    }
    

    if(submit_button.disabled === true){
        document.getElementById("loginButton").style.cursor = "default";
    }
        
    else {
        document.getElementById("loginButton").style.cursor = "pointer";
        }
        
}
    // displays all the user messages
    user_feedback.innerHTML = user_messages.join('<br>');



    let userNameInput = document.getElementsByClassName("user_Name")[0];
    let container = document.getElementsByClassName('container')[0];

    if(user_messages.length > 0) {
       
        let totalMargin = user_messages.length * 22;
        userNameInput.style.marginBottom = totalMargin + "px";
        container.style.height = "600px";
    }else{
        userNameInput.style.marginBottom = "23px"; 
        container.style.height = "570px";
    }

    user_messages.forEach(index => {
        user_messages[index].style.marginBottom = "10px";
    });

    }


    function checkEmail() {
        let email_messages = [];
        let email = document.getElementById("user_email").value;
        submit_button.disabled = false;
    
        if (email === "") {
            email_messages.push("This field is required");
            submit_button.disabled = true;
        } else {
            // if the email is invaild
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                email_messages.push("Please enter a valid email address");
                submit_button.disabled = true;
            }
    
            if (localStorage[email] !== undefined) {
                email_messages.push("Email is already taken");
                submit_button.disabled = true;
            }
        }
    
      
        if (submit_button.disabled === true) {
            document.getElementById("loginButton").style.cursor = "default";
        } else {
            document.getElementById("loginButton").style.cursor = "pointer";
        }
    
  
        email_feedback.innerHTML = email_messages.join('<br>');
    
        let emailInputContainer = document.getElementsByClassName("user_input")[1]; 
        let container = document.getElementsByClassName('container')[0];
        
        if (email_messages.length > 0) {
            let totalMargin = email_messages.length * 22;
            emailInputContainer.style.marginBottom = totalMargin + "px";
            container.style.height = "600px";
        } else {
            emailInputContainer.style.marginBottom = "23px"; 
            container.style.height = "570px";
        }
    }
    

function storeUser() {
    var userInfo = {};
    userInfo.user_name = document.getElementById("username").value;
    userInfo.userPassword = document.getElementById("userPassword").value;
    userInfo.user_email = document.getElementById("user_email").value;
    if (userInfo.user_name === "" || userInfo.userPassword === "" || userInfo.user_email === "") {
       alert("please fill in all the fields");
       submit_button.disabled = true;
       return;
    }

    if(submit_button.disabled === true){
        document.getElementById("loginButton").style.cursor = "default";
    }
        
    else {
        document.getElementById("loginButton").style.cursor = "pointer";
        }
     // stores the username and email in the local storage
    localStorage.setItem('loggedIn', 'true');
    localStorage[userInfo.user_name] = JSON.stringify(userInfo);
    localStorage[userInfo.user_email] =  JSON.stringify(userInfo);
    alert("Registered successfully");

}
// signout function
function signout(){
    const loggedIn = localStorage.getItem('loggedIn') === 'true';
    if (!loggedIn) {
        alert("You are already logged out.");
        return; 
    }

    localStorage.setItem('loggedIn', 'false');
    alert("Signed out successfully");
}


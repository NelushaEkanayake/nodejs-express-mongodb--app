
 var URL = location.protocol + '//' + location.host;
function validateInput1(FirstName,lastname,username,password) {
    
    const EMAIL_REG = /[a-zA-Z][a-zA-Z0-9_\.]{1,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}/g;
    if(username.match(EMAIL_REG)){
        $("#emailid1").removeClass("is-invalid");
    }else {
        $("#emailid1").addClass("is-invalid");
    }

    
    if(password.length > 2){
        $("#passwordid1").removeClass("is-invalid");
    }else {
        $("#passwordid1").addClass("is-invalid");
    }

    


    if(FirstName !==""){
         $("#firstname").removeClass("is-invalid");
     }else{
        $("#firstname").addClass("is-invalid");
     }

     if(lastname !==""){
         $("#lastname").removeClass("is-invalid");
     }else{
        $("#lastname").addClass("is-invalid");
     }

     if(!username.match(EMAIL_REG) || password.length <= 2 || FirstName ==""|| lastname =="")
        return true; 

    return false;
}

function signup() {
    $("#signupbtn1").on("click", function(event) {
    
        event.preventDefault();

        let firstname = $("#firstname").val();
        let lastname = $("#lastname").val();
        let username = $("#emailid1").val();
        let password = $("#passwordid1").val();
        
        let check = validateInput1(firstname,lastname,username,password);

       if (!check) {
            
            $.ajax({
                url: `http://localhost:3000/users/signup`,
                method: "POST",
                data: {username: username, lastname: lastname,firstname: firstname, password: password},
                success: function(data) {

        

                	
                	console.log(data);
                
                    alert("Create a new account succeeds!");
                
                    console.log(data);

                    $.ajax({
                    url: `${window.location.origin}/users/login`,
                    method: "POST",
                    data: {username: username, password: password},
                    success: function(data) {

                            

                           document.location.href = "/events";
                           console.log(data);

                        },
                    error: function(err) {
                        alert("Your email or password entered is incorrect. Please try again!");
                         }
                     })


                    },
                error: function(err) {
                   alert(err.responseText);
                }
            });


        }
    });



    
}



$(document).ready(function() {
    signup();
});



function login(){
    $("#loginbtn2").on("click", function(event) {
        event.preventDefault();
        let username = $("#emailid").val();
        let password = $("#passwordid").val();

        $.ajax({
            url: 'http://localhost:3000/users/login',
            method: "POST",
            data: {username: username, password: password},
            success: function(data) {
               
                alert("You are successfully loged in!");
                document.location.href = "/events";
                console.log(data);
            },
            error: function(err) {
                alert("Your email or password entered is incorrect. Please try again!");
            }
        })
        


    });
}






$(document).ready(function() {
    login();
   
});  


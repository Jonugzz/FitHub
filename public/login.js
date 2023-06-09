$(document).ready(function() {
    $("#btn-login-submit").click(function() {
        var username = $("#username").val();
        var password = $("#password").val();
  
        if(username == "ssc2023" && password == "123456") {
            // Redirigir a ejercicios.html
            window.location.href = "ejercicios.html";
        } else {
            $("#login-error").show();
        }
    });

    $("#btn-library").click(function() {
        // Redirigir a libreria.html
        window.location.href = "libreria.html";
    });
});

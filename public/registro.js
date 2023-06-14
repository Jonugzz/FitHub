$(document).ready(function() {
    $("#btn-reg-submit").click(function(e) {
        e.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        // Llamar al endpoint de inicio de sesión
        $.ajax({
            url: '/fithub/register',  // URL del endpoint de inicio de sesión
            type: 'POST',          // Método del endpoint
            contentType: 'application/json', // Indica que estamos enviando JSON
            data: JSON.stringify({ 
                email: username,   // Nombre del campo de correo electrónico en tu endpoint
                password: password // Nombre del campo de contraseña en tu endpoint
            }),
            success: function(response) {

                // Redirigir a ejercicios.html
                window.location.href = "/";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Mostrar mensaje de error
                $("#login-error").show();
            }
        });
    });

    $("#btn-login").click(function() {
        // Redirigir a libreria.html
        window.location.href = "/";
    });
});
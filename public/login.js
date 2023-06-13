$(document).ready(function() {
    $("#btn-login-submit").click(function(e) {
        e.preventDefault();

        var username = $("#username").val();
        var password = $("#password").val();

        // Llamar al endpoint de inicio de sesión
        $.ajax({
            url: '/fithub/login',  // URL del endpoint de inicio de sesión
            type: 'POST',          // Método del endpoint
            contentType: 'application/json', // Indica que estamos enviando JSON
            data: JSON.stringify({ 
                email: username,   // Nombre del campo de correo electrónico en tu endpoint
                password: password // Nombre del campo de contraseña en tu endpoint
            }),
            success: function(response) {
                // Almacenar el token en localstorage
                localStorage.setItem('sessiontoken', response.token);

                // Redirigir a ejercicios.html
                window.location.href = "ejercicios.html";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                // Mostrar mensaje de error
                $("#login-error").show();
            }
        });
    });

    $("#btn-library").click(function() {
        // Redirigir a libreria.html
        window.location.href = "libreria.html";
    });
});

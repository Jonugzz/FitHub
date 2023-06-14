var jwt = localStorage.getItem('sessiontoken');
if (!jwt) {
    // Si no hay token, redirigir al inicio de sesión
    window.location.href = "/";
}

let settings = {
    method : 'GET', 
    headers : {
        sessiontoken : jwt
    }
};

fetch('/fithub/validate-token', settings)
    .then(res => {
        if(res.ok){
            console.log("sesion valida");
            return res.json();
        }
        throw new Error(res.statusText);
    })
    .catch(err => {
        console.log(err);
        window.location.href = "/";
    });


//log out
$("#btnLogout").on("click", function() {
    localStorage.clear();
    window.location.href = "/";
});
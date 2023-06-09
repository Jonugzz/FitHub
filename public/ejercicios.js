$(document).ready(function() {

    // Start your code from here

let library_muscles = [ 
    "Abdominales", 
    "Abductores",
    "Aductores",
    "Antebrazos",
    "Biceps",
    "Cardio",
    "Cuádriceps",
    "Cuerpo Entero",
    "Dorsales",
    "Espalda Baja",
    "Espalda Superior",
    "Gemelos",
    "Glúteos",
    "Hombros",
    "Isquiotibiales",
    "Olímpico",
    "Pecho",
    "Trapecio",
    "Tríceps",
    "Otros"
]
let library_equip = [ 
"Ninguno",
"Banda de Resistencia",
"Banda de Suspensión",
"Barra",
"Mancuerna",
"Máquina",
"Pesa Rusa",
"Placa de Peso",
"Otro"
]

let library_exercise = []
var id_exer = "";


function getLibrary(){
    library_exercise = []
    $.ajax({
        url: 'http://localhost:8080/fithub/exercices',
        type: 'GET',
        success: function(res) {
          const _library_exercise = res.map(item => ({
            _id: item._id,
            title_exer: item.title_exer,
            muscle_exer: item.muscle_exer,
            equipment: item.equipment,
            min_img_url: item.min_img_url,
            anim_img_url: item.anim_img_url
          }));
      
          console.log(_library_exercise);
      
          if (_library_exercise.length > 0) {
                library_exercise = _library_exercise
                loadLibrary(library_exercise)
                loadArrayZero()
          } else {
            console.log('No hay ejercicios en la biblioteca.');
          }
        },
        error: function(error) {
          console.error(error);
        }
      });
}

getLibrary();


let exc_index_list = -1
let create_excer = true

function loadLists(){
    
    for(let i = 0; i < library_muscles.length; i++){
        $('#muscleLis').append(`
        <option ">${library_muscles[i]} </option>
        `)

        $('#ne_muscleLis').append(`
        <option ">${library_muscles[i]} </option>
        `)
    }
    
    for(let i = 0; i < library_equip.length; i++){
        $('#equipmentList').append(`
        <option ">${library_equip[i]} </option>
        `)

        $('#ne_equipmentList').append(`
        <option ">${library_equip[i]} </option>
        `)
    }    
}



$(".lib-title").on("click", '.btnNewExc', function(){
    let var_clear = ''
    create_excer = true
    document.getElementById('new-excer-container').style.display="block";
    $("#ne_equipmentList").val(library_equip[0])
    $("#ne_muscleLis").val(library_muscles[0])
    $("#ne_name").val(var_clear)
    $("#ne_min_img_url").val(var_clear)
    $("#ne_anim_img_url").val(var_clear)
  })

$(".new-excer-container").on("click", '.btn-cancel', function(){
    document.getElementById('new-excer-container').style.display="none"
})

$(".contenedor").on("click", '.btn-upd', function(){
    create_excer = false
    document.getElementById('new-excer-container').style.display="block"
    $("#id_exe").text(library_exercise[exc_index_list]._id)
    $("#ne_equipmentList").val(library_exercise[exc_index_list].equipment)
    $("#ne_muscleLis").val(library_exercise[exc_index_list].muscle_exer)
    $("#ne_name").val(library_exercise[exc_index_list].title_exer)
    $("#ne_min_img_url").val(library_exercise[exc_index_list].min_img_url)
    $("#ne_anim_img_url").val(library_exercise[exc_index_list].anim_img_url)
})


$(".contenedor").on("click", '.btn-del', function(){

    var ejercicioId = {
        "_id": id_exer,
      };

    $.ajax({
        url: 'http://localhost:8080/fithub/del_excer',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ _id: ejercicioId._id }),
        success: function(res) {
          console.log('Ejercicio eliminado con éxito: ', res);
          getLibrary();
        },
        error: function(error) {
          console.error('Ocurrió un error al eliminar el ejercicio: ', error);
        }
      });

})

$(".new-excer-container").on("click", '.btn-submit', function(){
    document.getElementById('new-excer-container').style.display="none"
    if(create_excer){
        createExcersice()
    }else{
        updateExcersice()
    }
})

function createExcersice(){
    var exercise = new Object()
    exercise.title_exer = $("#ne_name").val()
    exercise.muscle_exer = $("#ne_muscleLis").val()
    exercise.equipment = $("#ne_equipmentList").val()
    exercise.min_img_url = $("#ne_min_img_url").val()
    exercise.anim_img_url = $("#ne_anim_img_url").val()

    post_new_exe(exercise)

}

function post_new_exe(exercise){
    $.ajax({
        url: 'http://localhost:8080/fithub/newExer',
        type: 'POST',
        data: JSON.stringify(exercise),
        contentType: "application/json",
        success: function(res) {
          console.log(res);
        },
        error: function(error) {
          console.error(error);
        }
      });

      getLibrary()
      //loadLibrary(library_exercise)
      //loadLists()
  
  
      exc_index_list = library_exercise.length-1
      $("#ex-title").text(library_exercise[exc_index_list].title_exer);
      $("#ex-equip").text(library_exercise[exc_index_list].equipment);
      $("#ex-musc").text(library_exercise[exc_index_list].muscle_exer);
  
      document.getElementById("cover").src=`${library_exercise[exc_index_list].anim_img_url}`;
}


function updateExcersice(){

    var ejercicio = {
        "_id": $("#id_exe").text(),
        "title_exer": $("#ne_name").val(), 
        "muscle_exer": $("#ne_muscleLis").val(),
        "equipment": $("#ne_equipmentList").val(),
        "min_img_url": $("#ne_min_img_url").val(), 
        "anim_img_url": $("#ne_anim_img_url").val()
      };

      console.log(ejercicio._id)
      
    $.ajax({
      url: 'http://localhost:8080/fithub/edit_excer/' + ejercicio._id,
      type: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify(ejercicio),
      success: function(res) {
        console.log('Ejercicio actualizado con éxito: ', res);
      },
      error: function(error) {
        console.error('Ocurrió un error al actualizar el ejercicio: ', error);
      }
    });

    getLibrary()
}

$("#items-library").on("click", '.item' ,'button', fSelItem)

$(document).ready(function() {
  $("#btnLogout").click(function() {
      window.location.href = "login.html";
  });
});


function fSelItem(){

    id_exer = $(this).find("p").html()
    let pos = 0
    
    do{
        if (id_exer  == library_exercise[pos]._id)
        {
            $("#ex-title").text(library_exercise[pos].title_exer);
            $("#ex-equip").text(library_exercise[pos].equipment);
            $("#ex-musc").text(library_exercise[pos].muscle_exer);
            $("#cover").attr("src", `${library_exercise[pos].anim_img_url}`);
            
            exc_index_list = pos
            pos = library_exercise.length
        }
        pos++
    }while(pos < library_exercise.length)   
}

function loadLibrary(array) {

    $("#items-library").empty();

    for(let i = 0; i < array.length; i++){

        $(".items-library").append(
            `
            <div class="item" _id="item">
            <div class="item-library">
                <div class="img-container">
                    <img class="cover" src="${array[i].min_img_url}" alt="${array[i].title_exer}">
                </div>
                <div class="info-excer">
                    <p class="id-excer _id="${array[i]._id}">${array[i]._id}</p>
                    <p class="title-excer _id="${array[i].title_exer}">${array[i].title_exer}</p>
                    <p class="muscle-excer _id="muscle-excer">${array[i].muscle_exer}</p>
                </div>
            </div>
            <hr>
            </div>
        `)
    }
}

function loadExercise(itemExer){
    $(".cover")
}

function loadArrayZero(){
    if(library_exercise.length > 0){
        exc_index_list = 0
        $("#ex-title").text(library_exercise[0].title_exer);
        $("#ex-equip").text(library_exercise[0].equipment);
        $("#ex-musc").text(library_exercise[0].muscle_exer);
        document.getElementById("cover").src=`${library_exercise[0].anim_img_url}`;
    }else{
        exc_index_list = -1
        $("#ex-title").text("");
        $("#ex-equip").text("");
        $("#ex-musc").text("");
        document.getElementById("cover").src="";
    }


}

loadLibrary(library_exercise)
loadLists()
});
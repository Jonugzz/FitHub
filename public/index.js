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



 //Exercices.getAllExercices();

 //console.log("Hola")
//console.log(library_exercise)
//console.log("bye")

/*
$.ajax({
    url: 'http://localhost:8080/fithub/exercices',
    type: 'GET',
    success: function(res) {
      library_exercise = res
      console.log(library_exercise);
    },
    error: function(error) {
      console.error(error);
    }
  });


var exercise1 = new Object()
exercise1.title_exer = "Ab Wheel"
exercise1.muscle_exer = "Abdominals"
exercise1.equipment = "Other"
exercise1.min_img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtnKeAFdLbOjo6sxDTcxr3helEBABSBOZHA&usqp=CAU"
exercise1.anim_img_url = ""
exercise1.stat_img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwtnKeAFdLbOjo6sxDTcxr3helEBABSBOZHA&usqp=CAU"

library_exercise.push(exercise1)

var exercise2 = new Object()
exercise2.title_exer = "Bench Dip"
exercise2.muscle_exer = "Triceps"
exercise2.equipment = "Other"
exercise2.min_img_url = "https://thumbs.dreamstime.com/b/bench-dip-exercise-illustration-workout-57003308.jpg"
exercise2.anim_img_url = ""
exercise2.stat_img_url = "https://thumbs.dreamstime.com/b/bench-dip-exercise-illustration-workout-57003308.jpg"

library_exercise.push(exercise2)

var exercise3 = new Object()
exercise3.title_exer = "Ab Scissors"
exercise3.muscle_exer = "Abdominals"
exercise3.equipment = "None"
exercise3.min_img_url = "https://www.fitwirr.com/wp-content/uploads/2020/10/8-minute-abs-workout-1.jpg"
exercise3.anim_img_url = ""
exercise3.stat_img_url = "https://www.fitwirr.com/wp-content/uploads/2020/10/8-minute-abs-workout-1.jpg"

library_exercise.push(exercise3)

var exercise4 = new Object()
exercise4.title_exer = "Back Extension"
exercise4.muscle_exer = "Lower Back"
exercise4.equipment = "Machine"
exercise4.min_img_url = "https://static.strengthlevel.com/images/illustrations/machine-back-extension-1000x1000.jpg"
exercise4.anim_img_url = ""
exercise4.stat_img_url = "https://static.strengthlevel.com/images/illustrations/machine-back-extension-1000x1000.jpg"

library_exercise.push(exercise4)

var exercise5 = new Object()
exercise5.title_exer = "Arnold Press"
exercise5.muscle_exer = "Shoulders"
exercise5.equipment = "Dumbbell"
exercise5.min_img_url = "https://www.bodybuildingmealplan.com/wp-content/uploads/shutterstock_428906836-scaled.jpg"
exercise5.anim_img_url = ""
exercise5.stat_img_url = "https://www.bodybuildingmealplan.com/wp-content/uploads/shutterstock_428906836-scaled.jpg"

library_exercise.push(exercise5)

var exercise6 = new Object()
exercise6.title_exer = "Drag Curl"
exercise6.muscle_exer = "Biceps"
exercise6.equipment = "Barbell"
exercise6.min_img_url = "https://d38ty1ecdjk742.cloudfront.net/wp-content/uploads/barbell-standing-curl-exercise-300x300.jpg"
exercise6.anim_img_url = "https://fitnessprogramer.com/wp-content/uploads/2022/12/Barbell-Drag-Curl.gif"
exercise6.stat_img_url = "https://www.fitliferegime.com/wp-content/uploads/2022/03/Dumbbell-Drag-Curl.jpg"

library_exercise.push(exercise6)

var exercise7 = new Object()
exercise7.title_exer = "EZ Bar Biceps Curl"
exercise7.muscle_exer = "Biceps"
exercise7.equipment = "Barbell"
exercise7.min_img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdwBGKo9vXxl9oKYYCwJX1Njs4Y1bzW0NaEw&usqp=CAU"
exercise7.anim_img_url = "https://fitnessvolt.com/wp-content/uploads/2021/09/04461301-EZ-Barbell-Close-grip-Curl-Upper-Arms-360.gif"
exercise7.stat_img_url = "https://bodybuilding-wizard.com/wp-content/uploads/2015/01/e-z-bar-biceps-curl.jpg"

library_exercise.push(exercise7)

var exercise8 = new Object()
exercise8.title_exer = "Hammer Curl (Band)"
exercise8.muscle_exer = "Biceps"
exercise8.equipment = "Resistance Band"
exercise8.min_img_url = "https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/08971101-Band-hammer-curl_Forearms_small.jpg"
exercise8.anim_img_url = "https://fitnessprogramer.com/wp-content/uploads/2022/07/Hammer-Curl-with-Resistance-Band.gif"
exercise8.stat_img_url = "https://pump-app.s3.eu-west-2.amazonaws.com/exercise-assets/08971101-Band-hammer-curl_Forearms_small.jpg"

library_exercise.push(exercise8)

var exercise9 = new Object()
exercise9.title_exer = "Hammer Curl (Cable)"
exercise9.muscle_exer = "Biceps"
exercise9.equipment = "Machine"
exercise9.min_img_url = "https://images.squarespace-cdn.com/content/v1/5ffcea9416aee143500ea103/1638179046058-PMO6QWF6M8ANU1KGVFW0/Standing%2BCable%2BRope%2BHammer%2BCurl.png"
exercise9.anim_img_url = ""
exercise9.stat_img_url = "https://cdn.shopify.com/s/files/1/1497/9682/articles/1_1_42ccb79d-1b2f-4bd6-a9d4-e886fb09fd06.png?v=1646826645"

library_exercise.push(exercise9)

var exercise10 = new Object()
exercise10.title_exer = "Hammer Curl (Dumbbell)"
exercise10.muscle_exer = "Biceps"
exercise10.equipment = "Dumbbell"
exercise10.min_img_url = "https://cdn.shopify.com/s/files/1/0250/0362/2496/articles/5fa2d13e06ae0ac61604ad32_hammer-curl.png?v=1641753307"
exercise10.anim_img_url = "https://www.inspireusafoundation.org/wp-content/uploads/2022/04/dumbbell-hammer-curl.gif"
exercise10.stat_img_url = "https://cdn.shopify.com/s/files/1/0250/0362/2496/articles/5fa2d13e06ae0ac61604ad32_hammer-curl.png?v=1641753307"

library_exercise.push(exercise10)*/

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
    $("#ne_stat_img_url").val(var_clear)
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
    //loadArrayZero()


    exc_index_list = library_exercise.length-1
    $("#ex-title").text(library_exercise[exc_index_list].title_exer);
    $("#ex-equip").text(library_exercise[exc_index_list].equipment);
    $("#ex-musc").text(library_exercise[exc_index_list].muscle_exer);

    if(library_exercise[exc_index_list].anim_img_url != ""){
        document.getElementById("cover").src=`${library_exercise[exc_index_list].anim_img_url}`;
    }else{
        document.getElementById("cover").src=`${library_exercise[exc_index_list].stat_img_url}`;
    } 
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

function fSelItem(){

    id_exer = $(this).find("p").html()
    let pos = 0
    
    do{
        if (id_exer  == library_exercise[pos]._id)
        {
            $("#ex-title").text(library_exercise[pos].title_exer);
            $("#ex-equip").text(library_exercise[pos].equipment);
            $("#ex-musc").text(library_exercise[pos].muscle_exer);
            if(library_exercise[pos].anim_img_url != ""){
                $("#cover").attr("src", `${library_exercise[pos].anim_img_url}`);
            }else{
                $("#cover").attr("src", `${library_exercise[pos].stat_img_url}`);
            }
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
    
        if(library_exercise[0].anim_img_url != ""){
            document.getElementById("cover").src=`${library_exercise[0].anim_img_url}`;
        }else{
            document.getElementById("cover").src=`${library_exercise[0].stat_img_url}`;
        }
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
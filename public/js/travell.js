let travellContainer = document.querySelector(".travells-container")
let travellsMade = document.querySelector(".travellsMade-container")
let createTravell = document.querySelector(".button-add-travell")
let aButton = document.querySelector('.a-create-travell');
let formTravell = document.querySelector(".form-createTravell")  
let closeFormTravell = document.querySelector(".x-button")
let buttonFutureTravell = document.querySelector(".option-futureTravell")
let buttonMadeTravell = document.querySelector('.option-madeTravell')
let buttonDeleteTravell = document.querySelectorAll('.delete-travell-button')
let formDeleteTravell = document.querySelectorAll('.form-delete-travell')
let xButtonForm = document.querySelectorAll('.x-button-form')

let createTravellSecond = 1;
let madeTravell = false;

if(aButton != null){
    aButton.addEventListener('click', function(evt){
        madeTravell = true;
        evt.preventDefault()
        travellContainer.style.display = 'none';
        travellsMade.style.display = 'none';
        formTravell.style.display = 'flex';    
        })
}

createTravell.addEventListener('click', function(evt){
    evt.preventDefault();
    madeTravell = false;
    travellContainer.style.display = 'none';
    travellsMade.style.display = 'none';
    formTravell.style.display = 'flex';
})

closeFormTravell.addEventListener('click', function(evt){
    evt.preventDefault();
    travellContainer.style.display = 'flex';
    formTravell.style.display = 'none';
    if(madeTravell == true){
        travellContainer.style.display = 'none';
        formTravell.style.display = 'none';
        travellsMade.style.display = 'flex'
    }
})

buttonMadeTravell.addEventListener('click', function(){
    madeTravell = true;
    buttonFutureTravell.style.border = 'none'
    buttonMadeTravell.style.borderBottom = '1.5px darkslateblue solid'
    travellContainer.style.display = 'none';
    formTravell.style.display = 'none';
    travellsMade.style.display = 'flex'
})

buttonFutureTravell.addEventListener('click', function(){
    madeTravell = false;
    buttonMadeTravell.style.border = 'none'
    buttonFutureTravell.style.borderBottom = '1.5px darkslateblue solid'
    travellContainer.style.display = 'flex';
    formTravell.style.display = 'none';
    travellsMade.style.display = 'none'
})

// ELIMINAR VIAJE //
for(let i = 0; i < buttonDeleteTravell.length; i++){
    buttonDeleteTravell[i].addEventListener('click', function(){
        formDeleteTravell[i].style.display = 'flex';
    })
}

for(let i = 0; i < xButtonForm.length; i++){
    xButtonForm[i].addEventListener('click', function(evt){
        evt.preventDefault();
        formDeleteTravell[i].style.display = 'none'
    //     console.log('clickeado')
    })
}

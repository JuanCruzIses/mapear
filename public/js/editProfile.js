let formEditProfile = document.querySelector('.form-edit-profile')
let formEditPassword = document.querySelector('.form-edit-password')
let buttonEditProfile = document.querySelector('.button-edit-profile')
let buttonPasswordEdit = document.querySelector('.button-edit-password')
let xButtonProfile = document.querySelector('.x-buttonProfile')
let xButtonPassword = document.querySelector('.x-buttonPassword')



let click = 1;

buttonEditProfile.addEventListener('click', function(){
    click++;
    if(click % 2 == 0){
        formEditProfile.style.display = 'block'
    } else {
        formEditProfile.style.display = 'none'
    }
})

xButtonProfile.addEventListener('click', function(evt){
    evt.preventDefault();
    formEditProfile.style.display = 'none'
    click = 1
})

buttonPasswordEdit.addEventListener('click', function(){
    click++;
    if(click % 2 == 0){
        formEditPassword.style.display = 'block'
    } else {
        formEditPassword.style.display = 'none'
    }
})

xButtonPassword.addEventListener('click', function(evt){
    evt.preventDefault();
    formEditPassword.style.display = 'none'
    click = 1
})


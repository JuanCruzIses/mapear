let formAddActivity = document.querySelector('.form-add-activity')
let PformAddActivity = document.querySelector('.form-add-activity p')
let addActivityButton = document.querySelectorAll('.add-activity-button')
let main = document.querySelector('main')
let closeFormTravell = document.querySelector(".x-button")
let acceptActivity = document.querySelector('accept-activity')
let selectForm = document.querySelector('.input-activity')
let inputNumberDay = document.querySelector('.input-numberDay')
let countActivity = document.querySelectorAll('.detailActivity')
let msgRefusedActivities = document.querySelectorAll('.msg-notMoreActivities')

for(let i = 0; i < addActivityButton.length; i++){
    addActivityButton[i].addEventListener('click', function(event){
        contador = 0
        countActivity.forEach((element)=>{
            if(element.className.includes(i+1)){
                contador += 1
                return contador
            }
        })
        if(contador < 5){
            event.preventDefault;
            main.style.opacity = '20%'
            formAddActivity.style.display = 'flex'
            inputNumberDay.value = i+1
        } else{
            msgRefusedActivities[i].innerText = 'Lo sentimos, llegaste al maximo de actividades programadas por dia'
        }
    })
}

closeFormTravell.addEventListener('click', function(){
    main.style.opacity = '100%'
    formAddActivity.style.display = 'none'
})


/*-----FORM ADD USERS */
let addUsers = document.querySelector('.buttonAddUser')
let formAddUsers = document.querySelector('#form-addUsers')
let closeFormAddUsers = document.querySelector('#x-button-formAddUser')

addUsers.addEventListener('click', function(){
    main.style.opacity = '20%'
    formAddUsers.style.display = "flex"
})

closeFormAddUsers.addEventListener('click', function(){
    formAddUsers.style.display = "none"
    main.style.opacity = '100%'
})


/*-----FORM DELETE ACTIVITY */
let containerActivity = document.querySelectorAll('li')
let arrowRight = document.querySelectorAll('.right-arrow')
let arrowLeft = document.querySelectorAll('.left-arrow')
let deleteActivityButton = document.querySelectorAll('.delete-activity-button')
let arrayIndex = []

for(let i = 0; i < arrowRight.length; i++){
    arrowRight[i].addEventListener('click', function(){
        if(arrowRight[i].className.includes('modify')){
            arrowRight[i].innerHTML = '<i class="fa-solid fa-angle-right"></i>'
            arrowRight[i].className = 'right-arrow'
            deleteActivityButton.forEach((element)=>{
                if(element.className.includes(i+1)){
                    element.style.display = 'none'
                }
            })
        } else{
            arrowRight[i].innerHTML = '<i class="fa-solid fa-angle-left"></i>'
            arrowRight[i].className = 'right-arrow modify'
            deleteActivityButton.forEach((element)=>{
                if(element.className.includes(i+1)){
                    element.style.display = 'block';
                }
            })
        }
    })
}

let formDeleteActivity = document.querySelector('#form-deleteActivity')
let inputCaptureId = document.querySelector('.activity-id-delete')
let closeFormDeleteActivity = document.querySelector('#x-button-deleteActivity')

deleteActivityButton.forEach((element)=>{
    element.addEventListener('click', function(){
        main.style.opacity = '20%';
        formDeleteActivity.style.display = 'block';
        inputCaptureId.value = element.id 
    })
})

closeFormDeleteActivity.addEventListener('click', function(evt){
    evt.preventDefault()
    main.style.opacity = '100%'
    formDeleteActivity.style.display = "none"
})
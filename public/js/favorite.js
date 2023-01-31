let card = document.querySelectorAll('.card-container')
let msgNoFav = document.querySelector('.msg-noFav')
let h1InfoUser = document.querySelector('.title-list')
let variableLocalUser = h1InfoUser.id
let arrayFavorites = localStorage.getItem('favorite' + variableLocalUser)

let arrayPrevFav = []
if(arrayFavorites){
    msgNoFav.style.display = 'none'
    arrayPrevFav = arrayFavorites.split(',')
    console.log(arrayPrevFav)
    arrayPrevFav.forEach(element=>{
        let cardSelection = document.getElementById(element)
        cardSelection.style.display = 'block'
    })
}
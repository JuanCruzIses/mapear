/* Slider */
window.addEventListener('load', () => {
    
    let imagen2 = document.querySelector(".container-img2")
    let imagen3 = document.querySelector(".container-img3")
    let imagen4 = document.querySelector(".container-img4")
    let imagen5 = document.querySelector(".container-img5")
    let imagen6 = document.querySelector(".container-img6")
 
    // initial slide
    let slide = 1;
 
    // total slides
    let slides = document.querySelectorAll(".slider ul li");
    total = slides.length;
 
    // show first slide
    showSlide(1);


    next = document.querySelector(".next");
    prev = document.querySelector(".prev")
 
    /**
     * event next button
     */
    next.addEventListener('click', (evt) => {
        evt.preventDefault();
        slide++;
        if (slide > total) { slide = 1; }
        showSlide(slide);
    })
 
    
    /* event prev button */
    prev.addEventListener("click", (evt) => {
        evt.preventDefault();
        slide--;
        if (slide < 1) { slide = total; }
        showSlide(slide);
    })
 
    /**
     * show slides
     * 
     * @param {number} n 
     * @return {null}
     * 
     */
    function showSlide(n) {
        n--; // decrement 1
        for (i = 0; i < slides.length; i++) {
            (i == n) ? slides[n].style.display = "block" : slides[i].style.display = "none";
        }
    }
 
    
    /* Slider */
    
    
/*---------- Container Search ------------*/
    let searchButton = document.querySelector(".search-button")
    let containerSearchForm = document.querySelector('div.container-search-form')
    let main = document.querySelector('main')
    let searchBar = document.querySelector('.search-bar')
    const provincias = [{nombre : 'Buenos Aires'}, {nombre : 'CABA'},{nombre : 'Catamarca'},{nombre : 'Chaco'},{nombre : 'Chubut'},{nombre : 'Córdoba'},{nombre : 'Corrientes'},{nombre : 'Entre Ríos'},{nombre : 'Formosa'},{nombre : 'Jujuy'},{nombre : 'La pampa'},{nombre : 'La rioja'},{nombre : 'Mendoza'},{nombre : 'Misiones'},{nombre : 'San Carlos de Bariloche'},{nombre : 'Río Negro'},{nombre : 'Salta'},{nombre : 'San Juan'},{nombre : 'San Luis'},{nombre : 'Santa Cruz'},{nombre : 'Santa Fe'},{nombre : 'Santiago del Estero'},{nombre : 'Tierra del fuego'},{nombre : 'Tucumán'}]
    let containerSearchResults = document.querySelector('ul.search-views')
    let searchResult = document.querySelectorAll('.search-views li')
    let a = document.querySelector(".result-a")

    let click = 1;
    
searchButton.addEventListener('click', function(){
    click++;
    if(click % 2 == 0){
        containerSearchForm.style.display = 'block';
        searchBar.focus()
    } else {
        containerSearchForm.style.display = 'none';
        for(let i = 0; i < searchResult.length; i++){
            searchResult[i].innerText = ''
            searchResult[i].style.display = 'none'
        }
        containerSearchResults.style.display = 'none'
    }
})
main.addEventListener('click', function(){
    click = 1
    containerSearchResults.style.display = 'none'
    containerSearchForm.style.display = 'none';
    for(let i = 0; i < searchResult.length; i++){
        searchResult[i].innerText = ''
    }
})

if(searchBar.value.length == 0){
    searchResult.forEach(result =>{
        result.innerText = ''
        result.style.display = 'none'
    })
}

let provincesFind
let search
searchBar.addEventListener('keydown', function(){
    containerSearchResults.style.display = 'block'
    searchResult.forEach(result =>{
        result.innerText = ''
        result.style.display = 'none'
    })
    provincesFind = []
    search = searchBar.value
    provincias.forEach(provincia =>{
        let findInProvince = provincia.nombre.toLowerCase().indexOf(search)
        if(findInProvince != -1){
            provincesFind.push(provincia.nombre)
        }
    })
    for(let i = 0; i < provincesFind.length; i++){
        searchResult[i].style.display = 'block'
        searchResult[i].innerText = provincesFind[i]
    }
})  


searchResult.forEach(option=>{
    option.addEventListener('mouseover', function(){
        option.style.background = '#add8e6db'
        console.log(option.textContent)
        searchBar.innerText = option.textContent
        searchBar.value = option.textContent
    })
})

searchResult.forEach(option =>{
    option.addEventListener('click', ()=>{
        searchBar.innerText = option.textContent
        searchBar.value = option.textContent
        searchBar.focus()
    })
})

searchResult.forEach(option=>{
    option.addEventListener('mouseout', function(){
        option.style.background = 'white'
    })
})

/* Container Search */


/*--------- Favorite action ----------------*/
let heart = document.querySelectorAll('.corazon')
let h1InfoUser = document.querySelector('.welcome-banner')
let variableLocalUser = h1InfoUser.id
let arrayFavorites = localStorage.getItem('favorite' + variableLocalUser)


let arrayPrevFav = []
if(arrayFavorites){
    arrayPrevFav = arrayFavorites.split(',')
    arrayPrevFav.forEach(element=>{
        heart[element].className = 'fa-solid fa-heart corazon'
    })
}

for(let i = 0; i < heart.length; i++){
    heart[i].addEventListener('click', function(){
        if(heart[i].className == 'fa-solid fa-heart corazon'){
            heart[i].className = 'fa-regular fa-heart corazon'
            let variable1 = String(i)
            let elementForDelete = arrayPrevFav.indexOf(variable1)
            arrayPrevFav.splice(elementForDelete, 1)
            localStorage.setItem('favorite' + variableLocalUser, arrayPrevFav)
        }
        else if(heart[i].classname != 'fa-solid fa-heart corazon'){
            heart[i].className = 'fa-solid fa-heart corazon'
            arrayPrevFav.push(heart[i].id)
            localStorage.setItem('favorite' + variableLocalUser, arrayPrevFav)
        }
    })
}
})
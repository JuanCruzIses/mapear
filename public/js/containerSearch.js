let searchButton = document.querySelector(".search-button")
let containerSearchForm = document.querySelector('div.container-search-form')
let main = document.querySelector('main')

let click = 1;

searchButton.addEventListener('click', function(){
    click++;
    if(click % 2 == 0){
        containerSearchForm.style.display = 'block';
    } else {
        containerSearchForm.style.display = 'none';
    }
})

main.addEventListener('click', function(){
    click = 1
    containerSearchForm.style.display = 'none';
})

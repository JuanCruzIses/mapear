let formSpent = document.querySelector('.form-spent')
let buttonAddSpent = document.querySelector('#button-add-travell')
let main = document.querySelector('main')
let closeButtonForm = document.querySelector('.x-button')
let divsModalGastos = document.querySelectorAll('.modal-gastos')
let buttonsDetail = document.querySelectorAll('.button-detail')
let modalDetailContador = document.querySelectorAll('.section-detail-spent')
let buttonConfirmDS = document.querySelectorAll('#button-confirm-detailSpent')
let travellId = document.querySelector('.h4-id')

// ---------------------------- //
catchInfoStorage = function(){
    let infoStorage = localStorage.getItem(travellId.id + 'modalGasto' + modalDetalleDeGasto)
    let infoStorageNumber = []
    if(infoStorage != undefined){
        let arrayInfoStorage = infoStorage.split(',')
        arrayInfoStorage.forEach(element=>{
            infoStorageNumber.push(Number(element)) 
        })
    }
    return infoStorageNumber
}

// SECTION DETAIL SPENT //
let valueSpent = document.querySelectorAll('.value-spent')
let valoresPorCosnumo = []
valueSpent.forEach(value => valoresPorCosnumo.push(parseInt(value.innerText)))
let checkBox = document.querySelectorAll('.input-checkBox')
let valueDivision = document.querySelectorAll('.value-division')


let cantidadChecked = 0;
let modalStatus
let arrayCheckeds = []



checkBox.forEach(function(element, i){
    element.addEventListener('click', function(){
        if(element.checked){
            let info = catchInfoStorage()


            arrayCheckeds.push(i)
            localStorage.setItem(travellId.id + 'modalGasto' + modalDetalleDeGasto, arrayCheckeds)
            
            valorDividido = parseInt(valoresPorCosnumo[modalDetalleDeGasto] / arrayCheckeds.length)
            arrayCheckeds.forEach(element => valueDivision[element].innerHTML = valorDividido)
        } else if(!element.checked){
            let info = catchInfoStorage() 
            
            let indexSplice = arrayCheckeds.indexOf(i);
            arrayCheckeds.splice(indexSplice, 1);
            
            let indexToDelete = info.indexOf(i)
            info.splice(indexToDelete, 1)
            localStorage.setItem(travellId.id + 'modalGasto' + modalDetalleDeGasto, info)
            
            console.log(info)
            if(info.length == 0){
                localStorage.removeItem(travellId.id + 'modalGasto' + modalDetalleDeGasto)
            }

            valorDividido = parseInt(valoresPorCosnumo[modalDetalleDeGasto] / arrayCheckeds.length)
            valueDivision[i].innerHTML = 0;
            arrayCheckeds.forEach(element => valueDivision[element].innerHTML = valorDividido)
        }
         else if(modalStatus == false){
            valueDivision[i].innerHTML = 0
        }
    })
})

// ABRIR Y CERRAR FORMULARIO DE GASTO NUEVO //

valorInputSpent = divsModalGastos.length +1

buttonAddSpent.addEventListener('click', function(evt){
    evt.preventDefault();
    main.style.opacity = '20%'
    formSpent.style.display = 'flex';
})

closeButtonForm.addEventListener('click', function(evt){
    evt.preventDefault();
    main.style.opacity = '100%'
    formSpent.style.display = 'none';
    arrayCheckeds = []
})

// DETALLE DE GASTO //
let modalDetalleDeGasto
for(let i = 0; buttonsDetail.length; i++){
    buttonsDetail[i].addEventListener('click', function(){
        modalDetailContador[i].style.display = 'block';
        main.style.opacity = '20%'
        modalDetalleDeGasto = i
        let info = catchInfoStorage()
        if(info.length){
            arrayCheckeds = info
            valorDividido = parseInt(valoresPorCosnumo[modalDetalleDeGasto] / arrayCheckeds.length)
            arrayCheckeds.forEach(element => {
                valueDivision[element].innerHTML = valorDividido;
                console.log(element)
                checkBox[element].checked = 'true';
            })
        }
    })
    

    buttonConfirmDS[i].addEventListener('click', function(){
        modalDetailContador[i].style.display = 'none';
        main.style.opacity = '100%';
        modalDetalleDeGasto = null;
        modalStatus = false
        arrayCheck = [];
        cantidadChecked = 0;
        arrayCheckeds = []
    })
}





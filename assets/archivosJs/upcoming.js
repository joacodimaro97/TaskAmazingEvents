const $contenedor = document.getElementById("section-upcoming")


const newCard = []
const fecha = dataCard.fechaActual

for( let cards of dataCard.eventos){
    if(cards.date > fecha ){
        newCard.push( cards )
    } 
}

/* let staff = ""
for(let cards of newCard ){
    staff += createCards( cards)
} */

/* $contenedor.innerHTML = staff */

const cartasHTML = newCard.map(createCards).join('')
$contenedor.innerHTML = cartasHTML

function createCards(newCard){
    return `
    <div id="1" class="card d-flex justify-content-center m-2" style="width: 18rem">
         <img src="${newCard.image}" class="card-img-top p-1" alt="${newCard.category}" style="width:18rem; height: 10rem;">
           <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title">${newCard.name}</h5>
              <p class="card-text">${newCard.description}</p>
             <div class=" d-flex flex-row justify-content-between">
               <p>$${newCard.price}</p>
               <a href="../pages/details.html?id=${newCard.name.replace(/ /g, "")}"" class="btn vermas btn-primary">See more..</a>
             </div>
           </div>
    </div>
`
}




function pasarAPantalla(parametro){
  if(parametro.length === 0){
    $contenedor.innerHTML = `<h3 class="text-white mt-3">No hay resutaldos para tu busqueda</h3>`
  } else {
    const pintarPantalla = parametro.map(createCards).join('')
    $contenedor.innerHTML = pintarPantalla
  }
}


// checkbox dinamicos

const $formcontent = document.getElementById("formcategory")
const $buscador = document.getElementById("search")

const categorys = newCard.map( newCard => newCard.category )

// utilizar estructura SET, es un tipo de lista que almacena valores unicos

const categorysOnly = new Set(categorys)

//array.from convierte en array lo que viene como argumento

const arrayCatOnly = Array.from( categorysOnly )

//toma como parametro category(categorias de checks) y elemento(lugar donde imprimirlos)


function imprimirCheck(categorys, elemento){
  let template = ""
  for(let categoria of categorys){
  template += `<fieldset>
  <input type="checkbox" name="${categoria}" id="">
  <label class="${categoria}" for="check">${categoria}</label>
</fieldset>`
    } elemento.innerHTML = template
    
}

imprimirCheck(arrayCatOnly, $formcontent)


//Funciones para filtrar:


function filtraTexto(array, texto){
  if(!texto){
    return array
  } else{
    let textoMinuscula = texto.toLowerCase()
    return array.filter(array => array.name.toLowerCase().includes(textoMinuscula) || array.description.toLowerCase().includes(textoMinuscula))
  }
}


function filtrarPorCategoria(array, categorias){
  if(categorias.length === 0){
    return array
  } else{
    return array.filter(newCard => categorias.includes(newCard.category))
  }
}

$buscador.addEventListener('input', (e) => {
  const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
  const cartasFiltradas = filtroCruzado(newCard, categoriaSeleccionada, $buscador.value)
  pasarAPantalla(cartasFiltradas)
})


$formcontent.addEventListener('change', () =>{
  const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
  const eventosFiltrados = filtrarPorCategoria(newCard, categoriaSeleccionada)
  pasarAPantalla(eventosFiltrados)
})


function filtroCruzado(array, categorias, texto ){
  const filtradosPorCategorias = filtrarPorCategoria(array,categorias)
  const filtradosPorTexto = filtraTexto(filtradosPorCategorias, texto)
  return filtradosPorTexto
}
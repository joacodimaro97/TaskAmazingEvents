//Informacion util para trabajar de forma organizada:
//El signo "$", no tiene funcionalidad, pero es una referencia de que si esta por delante de una palabra es un elemento html


/* Card dinamica base: 
id index.html= "main-index"

-Ubicaciones en el array:
nombre ----> name
imagen ----> image
descripcion ----> description */


const $contenedor = document.getElementById("section-index")

const $buscador = document.getElementById("search")

const newCard = dataCard.eventos



const cartasHTML = newCard.map(createCards).join('')
$contenedor.innerHTML = cartasHTML

function createCards(carta){
   return `
   <div id="1" class="card d-flex justify-content-center m-2" style="width: 18rem">
        <img src="${carta.image}" class="card-img-top p-1" alt="${carta.category}" style="width:18rem; height: 10rem;">
          <div class="card-body d-flex flex-column justify-content-center">
             <h5 class="card-title">${carta.name}</h5>
             <p class="card-text">${carta.description}</p>
            <div class=" d-flex flex-row justify-content-between">
              <p>$${carta.price}</p>
              <a href="./pages/details.html?id=${carta.name.replace(/ /g, "")}" class="btn vermas btn-primary">See more..</a>
            </div>
          </div>
   </div>
`
}

//task 3


function pasarAPantalla(parametro){
  if(parametro.length === 0){
    $contenedor.innerHTML = `<h3 class="text-white mt-3">No results for your search..</h3>`
  } else {
    const pintarPantalla = parametro.map(createCards).join('')
    $contenedor.innerHTML = pintarPantalla
  }
}


// checkbox dinamicos

const $formcontent = document.getElementById("formcategory")

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
  <label class="" for="${categoria}">${categoria}</label>
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
    return array.filter(newCard => newCard.name.toLowerCase().includes(textoMinuscula) || newCard.description.toLowerCase().includes(textoMinuscula))
  }
}


function filtrarPorCategoria(array, categorias){
  if(categorias.length === 0){
    return array
  } else{
    return array.filter(array => categorias.includes(array.category))
  }
}

// newCard contiene data.js eventos


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
//contenedores:
const $contenedorCartas = document.getElementById("section-index")

const $buscador = document.getElementById("search")

const $formcontent = document.getElementById("formcategory")

//traer datos del data.js
const newCard = dataCard.eventos


//pintar cartas
const cartasHTML = newCard.map(createCards).join('')
$contenedorCartas.innerHTML = cartasHTML


//setear checkboxs
const categorys = newCard.map( newCard => newCard.category )

const categorysOnly = new Set(categorys)

const arrayCatOnly = Array.from( categorysOnly )

//importar funciones
import { pasarAPantalla, imprimirCheck, filtraTexto, filtrarPorCategoria,filtroCruzado } from "./module/funciones.js"


imprimirCheck(arrayCatOnly, $formcontent)
filtraTexto(newCard, $buscador.value)
filtrarPorCategoria(newCard, arrayCatOnly)


//escuchador eventos
$buscador.addEventListener('input', () => {
  const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
  const cartasFiltradas = filtroCruzado(newCard, categoriaSeleccionada, $buscador.value)
  pasarAPantalla(cartasFiltradas, $contenedorCartas)
})


$formcontent.addEventListener('change', () =>{
  const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
  const eventosFiltrados = filtroCruzado(newCard, categoriaSeleccionada, $buscador.value )
  pasarAPantalla(eventosFiltrados, $contenedorCartas)
})


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
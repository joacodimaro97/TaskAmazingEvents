//contenedores:
const $contenedorCartas = document.getElementById("section-index")

const $buscador = document.getElementById("search")

const $formcontent = document.getElementById("formcategory")

//traer datos del data.js
let allEvents 


/* 
1- La función fetch() devuelve una promesa que se resuelve con la respuesta a la solicitud. 
2- Luego, se encadenan dos llamadas a then(): 
la primera convierte la respuesta a formato JSON con el método json y trasnforma el fetch en objeto javascript()
y la segunda imprime la respuesta en la consola con console.log() */
import { pasarAPantalla, imprimirCheck, filtraTexto, filtroCruzado } from "./module/funciones.js"

const urlFetch = 'https://mindhub-xj03.onrender.com/api/amazing'

let url = "./pages/details.html"

fetch(urlFetch)
                    .then(data => data.json())
                    .then(res => {
                    allEvents = res.events
                    console.log(allEvents)
                    pasarAPantalla(allEvents, $contenedorCartas, url)
                    const categorys = allEvents.map( event => event.category )
                    const categorysOnly = new Set(categorys)
                    const arrayCatOnly = Array.from( categorysOnly )
                    imprimirCheck(arrayCatOnly, $formcontent)
                    
                    }) 
                    .catch(err => console.log(err))



//importar funciones



filtraTexto(allEvents, $buscador.value)


//escuchador eventos
$buscador.addEventListener('input', () => {
  const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
  const cartasFiltradas = filtroCruzado(allEvents, categoriaSeleccionada, $buscador.value)
  pasarAPantalla(cartasFiltradas, $contenedorCartas)
})


$formcontent.addEventListener('change', () =>{
  const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
  const eventosFiltrados = filtroCruzado(allEvents, categoriaSeleccionada, $buscador.value )
  pasarAPantalla(eventosFiltrados, $contenedorCartas)
})



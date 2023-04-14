const $contenedorCartas = document.getElementById("section-past")

const $formcontent = document.getElementById("formcategory")

const $buscador = document.getElementById("search")

import {pasarAPantalla, imprimirCheck, filtraTexto,filtroCruzado } from "./module/funciones.js"

let url = "./details.html"

let allEvents;

const urlFetch = 'https://mindhub-xj03.onrender.com/api/amazing'


fetch(urlFetch)
                    .then(data => data.json())
                    .then(res => {
                    allEvents = res.events

                    let fecha = res.currentDate
                    let pastEvents = allEvents.filter(evento => evento.date < fecha)

                    console.log(pastEvents)

                    pasarAPantalla(pastEvents, $contenedorCartas, url)

                    const categorys = allEvents.map( allEvent => allEvent.category )
                    const categorysOnly = new Set(categorys)
                    const arrayCatOnly = Array.from( categorysOnly )
                    imprimirCheck(arrayCatOnly, $formcontent)
                    filtraTexto(allEvents, $buscador.value)

                    $buscador.addEventListener('input', () => {
                      const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
                      const cartasFiltradas = filtroCruzado(pastEvents, categoriaSeleccionada, $buscador.value)
                      pasarAPantalla(cartasFiltradas, $contenedorCartas)
                    })
                    
                    
                    $formcontent.addEventListener('change', () =>{
                      const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
                      const eventosFiltrados = filtroCruzado(pastEvents, categoriaSeleccionada, $buscador.value )
                      pasarAPantalla(eventosFiltrados, $contenedorCartas)
                    })
                    
                    
                    
                    
                    }) 
                    .catch(err => console.log(err))

//funciones importadas desde funciones.js






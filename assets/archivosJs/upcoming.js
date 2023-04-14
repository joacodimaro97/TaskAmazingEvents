//contenedores HTML
const $contenedorCartas = document.getElementById("section-upcoming")

const $formcontent = document.getElementById("formcategory")

const $buscador = document.getElementById("search")

import {pasarAPantalla, imprimirCheck, filtraTexto,filtroCruzado } from "./module/funciones.js"

let allEvents;

const urlFetch = 'https://mindhub-xj03.onrender.com/api/amazing'

let url = "./details.html"

fetch(urlFetch)
                    .then(data => data.json())
                    .then(res => {
                    allEvents = res.events

                    let fecha = res.currentDate
                    let upcomingEvents = allEvents.filter(evento => evento.date > fecha)

                    console.log(upcomingEvents)

                    pasarAPantalla(upcomingEvents, $contenedorCartas, url)

                    const categorys = allEvents.map( allEvent => allEvent.category )
                    const categorysOnly = new Set(categorys)
                    const arrayCatOnly = Array.from( categorysOnly )
                    imprimirCheck(arrayCatOnly, $formcontent)

                    $buscador.addEventListener('input', () => {
                      const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
                      const cartasFiltradas = filtroCruzado(upcomingEvents, categoriaSeleccionada, $buscador.value)
                      pasarAPantalla(cartasFiltradas, $contenedorCartas)
                    })
                    
                    
                    $formcontent.addEventListener('change', () =>{
                      const categoriaSeleccionada = Array.from(document.querySelectorAll('input[type="checkbox"]:checked')).map(check => check.name)
                      const eventosFiltrados = filtroCruzado(upcomingEvents, categoriaSeleccionada, $buscador.value )
                      pasarAPantalla(eventosFiltrados, $contenedorCartas)
                    })
                    
                    
                    
                    }) 
                    .catch(err => console.log(err))

//funciones importadas desde funciones.js


filtraTexto(allEvents, $buscador.value)




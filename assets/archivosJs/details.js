
let allEvents
//extrae la localizacion de document
let urlSearch = location.search
                    const $detailscont = document.getElementById("maindetail")

                    let parametro = new URLSearchParams(urlSearch)
                    
                    let idParams = parametro.get("id")


                    console.log(idParams)
const urlFetch = 'https://mindhub-xj03.onrender.com/api/amazing'


fetch(urlFetch)
                    .then(data => data.json())
                    .then(res => {
                    allEvents = res.events
                    
                    let cartasFiltradas  = allEvents.find(evento => evento._id == idParams)
                    console.log(cartasFiltradas)

                    $detailscont.innerHTML = pintarCarta(cartasFiltradas)

                    console.log(allEvents)

                    function pintarCarta(card){
                      return  `<div class="d-flex justify-content-center mt-5 mb-5 card" style="width: 80%; min-height: 66vh;">
                          <div class="d-flex justify-content-center row g-0">
                            <div class="col-md-4">
                              <img src="${card.image}" class="paginaDeDetails" alt="${card.category}" style="width:100%; height: 100%;">
                            </div>
                            <div class="col-md-6">
                              <div class="ms-5 card-body ">
                                <h2 class="card-title">${card.name}</h2>
                                <p class="card-text">
                                  <ul>
                                  <li class="text-start" >Date: ${card.date}</li>
                                  <li class="text-start" >Category: ${card.category}</li>
                                  <li class="text-start" >Place: ${card.place}</li>
                                  <li class="text-start" >Capacity: ${card.capacity}</li>
                                  ${card.assistance ? `<li class="text-start" >Assistance: ${card.assistance}</li>` : `<li class="text-start" >Estimate: ${card.estimate}</li>`}
                                  <li class="text-start" >Price: ${card.price}</li>
                                  <li class="text-start" >Description: ${card.description}</li>
                                </ul>
                              </div>
                            </div>
                          </div>
                        </div>`
                      }


                    })
                    .catch(err => console.log(err))




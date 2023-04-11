export function createCards(carta){

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

export function pasarAPantalla(parametro, lugar){
    if(parametro.length === 0){
      lugar.innerHTML = `<h3 class="text-white mt-3">No results for your search..</h3>`
    } else {
      const pintarPantalla = parametro.map(createCards).join('')
      lugar.innerHTML = pintarPantalla
    }
  }



export function imprimirCheck(categorys, elemento){
    let template = ""
    for(let categoria of categorys){
    template += `<fieldset>
    <input type="checkbox" name="${categoria}" id="">
    <label class="" for="${categoria}">${categoria}</label>
  </fieldset>`
      } elemento.innerHTML = template
  }

export  function filtraTexto(array, texto){
    if(!texto){
      return array
    } else{
      let textoMinuscula = texto.toLowerCase()
      return array.filter(newCard => newCard.name.toLowerCase().includes(textoMinuscula) || newCard.description.toLowerCase().includes(textoMinuscula))
    }
  }
  
  
export  function filtrarPorCategoria(array, categorias){
    if(categorias.length === 0){
      return array
    } else{
      return array.filter(array => categorias.includes(array.category))
    }
  }

export function filtroCruzado(array, categorias, texto ){
    const filtradosPorCategorias = filtrarPorCategoria(array,categorias)
    const filtradosPorTexto = filtraTexto(filtradosPorCategorias, texto)
    return filtradosPorTexto
  }
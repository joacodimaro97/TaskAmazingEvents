export function createCards(carta, url) {
  return `
    <div id="1" class="card d-flex justify-content-center m-2" style="width: 18rem">
        <img src="${carta.image}" class="card-img-top p-1" alt="${carta.category}" style="width:18rem; height: 10rem;">
          <div class="card-body d-flex flex-column justify-content-center">
              <h5 class="card-title">${carta.name}</h5>
              <p class="card-text text-light">${carta.description}</p>
            <div class=" d-flex flex-row justify-content-between">
              <p>$${carta.price}</p>
              <a href="${url}?id=${carta._id}" class="btn vermas btn-primary">See more..</a>
            </div>
          </div>
    </div>
`;
}

export function pasarAPantalla(parametro, lugar, url) {
  if (parametro.length === 0) {
    lugar.innerHTML = `<h3 class="text-white mt-3">No results for your search..</h3>`;
  } else {
    const pintarPantalla = parametro
      .map((evento) => createCards(evento, url))
      .join("");
    lugar.innerHTML = pintarPantalla;
  }
}

export function imprimirCheck(categorys, elemento) {
  let template = "";
  for (let categoria of categorys) {
    template += `
    <fieldset>
    <input type="checkbox" name="${categoria}" id="">
    <label class="" for="${categoria}">${categoria}</label>
    </fieldset>`;
  }
  elemento.innerHTML = template;
}

export function filtraTexto(array, texto) {
  if (!texto) {
    return array;
  } else {
    let textoMinuscula = texto.toLowerCase();
    return array.filter(
      (newCard) =>
        newCard.name.toLowerCase().includes(textoMinuscula) ||
        newCard.description.toLowerCase().includes(textoMinuscula)
    );
  }
}

export function filtrarPorCategoria(array, categorias) {
  if (categorias.length === 0) {
    return array;
  } else {
    return array.filter((array) => categorias.includes(array.category));
  }
}

export function filtroCruzado(array, categorias, texto) {
  const filtradosPorCategorias = filtrarPorCategoria(array, categorias);
  const filtradosPorTexto = filtraTexto(filtradosPorCategorias, texto);
  return filtradosPorTexto;
}

export function pintarCarta(card) {
  return `<div class="d-flex justify-content-center mt-5 mb-5 card" style="width: 80%; min-height: 66vh;">
        <div class="d-flex justify-content-center row g-0">
          <div class="col-md-4">
            <img src="${card.image}" class="paginaDeDetails" alt="${
    card.category
  }" style="width:100%; height: 100%;">
          </div>
          <div class="col-md-6">
            <div class="ms-5 card-body ">
              <h2 class="card-title">${card.name}</h2>
              <p class="card-text">
                <ul>
                <li>Date: ${card.date}</li>
                <li>Category: ${card.category}</li>
                <li>Place: ${card.place}</li>
                <li>Capacity: ${card.capacity}</li>
                ${
                  card.assistance
                    ? `<li>Assistance: ${card.assistance}</li>`
                    : `<li>Estimate: ${card.estimate}</li>`
                }
                <li>Price: ${card.price}</li>
                <li>Description: ${card.description}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>`;
}

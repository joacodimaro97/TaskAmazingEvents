//contenedor de la tabla en html

let allEvents;

const urlFetch = "https://mindhub-xj03.onrender.com/api/amazing";
//traer datos de la url de mindhub
fetch(urlFetch)
  .then((data) => data.json())
  .then((res) => {
    allEvents = res.events;

    let fecha = res.currentDate;
    //eventos filtrados por futuros y pasados
    const pastEvent = allEvents.filter((evento) => evento.date < fecha);
    const upcomingEvent = allEvents.filter((evento) => evento.date > fecha);

    //funcion para imprimir tabla en html
    function imprimirTabla() {
      return `
                    
                    <table>
                    <thead>
                    <tr>
                        <th class="text-center fs-1 bg-light" colspan="3">Events Statistics</th>
                    </tr>
                    <tr>
                        <th>Events with the highest percentage of attendance</th>
                        <th>Events with the lowest percentage of attendance</th>
                        <th>Events with larger capacity</th>
                    </tr>
                    <tr>
                        <td>${eventMaxAssistance(pastEvent)}</td>
                        <td>${eventMinAssistance(pastEvent)}</td>
                        <td>${eventMaxCapacity(allEvents)}</td>
                    </tr>
                    </thead>
                    <tr>
                        <th class="text-center fs-1 bg-light" colspan="3">Upcomming events statistics by category</th>
                    </tr>
                    <tr>
                        <td>Categories</td>
                        <td>Revenues</td>
                        <td>Percentage off attendance</td>
                    </tr>
                    <tbody id="upcomingEvent">
                    
                    </tbody>
                    <tr>
                        <th class="text-center fs-1 bg-light" colspan="3">Past Events statistic by category</th>
                    </tr>
                    <tr>
                        <td>Categories</td>
                        <td>Revenues</td>
                        <td>Percentage off attendance</td>
                    </tr>
                    <tbody id="pastEvent">
                    
                    </tbody>
                </table>
                    
                    `;
    }
    const $tableConteiner = document.getElementById("tableContent");
    $tableConteiner.innerHTML = imprimirTabla();

    //funcion para calcular los ingresos y porcentaje de asistencia de eventos futuros y pasados

    function allStatics(array) {
      let arrayStatics = array.map((e) => {
        return {
          categoria: e.category,
          revenues: e.price * (e.assistance ? e.assistance : e.estimate),
          porcentajeAsist:
            ((e.assistance ? e.assistance : e.estimate) * 100) / e.capacity,
        };
      });
      return arrayStatics;
    }

    //variables para guardar  estadisticas futuras y pasadas repetidas
    let upcomingStatics = allStatics(upcomingEvent);
    console.log(upcomingStatics);

    let pastStatics = allStatics(pastEvent);

    //funcion para no repetir estadisticas

    function finalStatics(arrayOrigin, arrayStac) {
      let arrayFilter = [
        ...new Set(arrayOrigin.map((evento) => evento.category)),
      ].map((categoria) => {
        let aux = arrayStac.filter(
          (elemento) => elemento.categoria == categoria
        );

        let acumulado = {
          categoria: categoria,
          revenues: 0,
          porcentaje: 0,
          cantidad: 0,
        };

        for (let iterator of aux) {
          acumulado.revenues += iterator.revenues;
          acumulado.porcentaje += iterator.porcentajeAsist;
          acumulado.cantidad++;
        }
        acumulado.porcentaje = acumulado.porcentaje / acumulado.cantidad;
        return acumulado;
      });
      return arrayFilter;
    }

    //variables donde se alojan los arrays de upcoming y past con las estadisticas finales
    let upcomingStaticsFinal = finalStatics(upcomingEvent, upcomingStatics);
    let pastEventsFinal = finalStatics(pastEvent, pastStatics);

    console.log(upcomingStaticsFinal);
    console.log(pastEventsFinal);

    //contenedores para imprimir tabla
    const $upcomingPrint = document.getElementById("upcomingEvent");
    const $pastPrint = document.getElementById("pastEvent");

    //funcion para imprimir tabla en cada seccion(upcoming y past)
    function tableStatics(array, place) {
      const template = array.reduce((acc, act) => {
        return (
          acc +
          `
    <tr>
    <td>${act.categoria}</td>
    <td>$ ${act.revenues} </td>
    <td>${act.porcentaje.toFixed(2)} %</td>
    </tr>
  `
        );
      }, "");
      place.innerHTML = template;
    }

    tableStatics(upcomingStaticsFinal, $upcomingPrint);
    tableStatics(pastEventsFinal, $pastPrint);
  })
  .catch((err) => console.log(err));

//funcion para filtrar asistencias
//por cada categoria, necesito todos los eventos de esa categoria, de esos eventos necesito : revenues y porcentaje de asistencia, pero como es para la categoria
//despues hay que sumarlo todo, con revenues lo sumas y listo, con porcentaje todo lo que sume lo divido por la cantidad que sume

function eventMaxAssistance(array) {
  let mayorAsistencia = { nombre: "", asistencia: 0 };

  array.forEach((a) => {
    const asistencia = (a.assistance * 100) / a.capacity;
    if (asistencia > mayorAsistencia.asistencia) {
      mayorAsistencia.nombre = a.name;
      mayorAsistencia.asistencia = asistencia;
    }
  });

  return `-${mayorAsistencia.nombre} : ${mayorAsistencia.asistencia.toFixed(
    1
  )} %`;
}

function eventMinAssistance(array) {
  let menorAsistencia = { nombre: "", asistencia: 100 };

  array.forEach((a) => {
    const asistencia = (a.assistance * 100) / a.capacity;
    if (asistencia < menorAsistencia.asistencia) {
      menorAsistencia.nombre = a.name;
      menorAsistencia.asistencia = asistencia;
    }
  });

  return `-${menorAsistencia.nombre} : ${menorAsistencia.asistencia.toFixed(
    1
  )} %`;
}

function eventMaxCapacity(array) {
  let mayorCapacidad = { nombre: "", capacidad: 0 };

  array.forEach((a) => {
    const capacidad = a.capacity;
    if (capacidad > mayorCapacidad.capacidad) {
      mayorCapacidad.nombre = a.name;
      mayorCapacidad.capacidad = capacidad;
    }
  });

  return `-${mayorCapacidad.nombre} : ${mayorCapacidad.capacidad.toFixed(
    0
  )} capacity`;
}

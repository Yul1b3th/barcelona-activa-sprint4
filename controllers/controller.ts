
// Obtén elementos del DOM
const jokeElement = document.getElementById('joke');
const nextJokeButton = document.getElementById('nextJoke');
const colorChangingSvg = document.getElementById("color-changing-svg");
const colors = ["#FF5733", "#0A609D", "#3366FF", "#9933FF", "#FF33A1", "#165E2F", "#FF6833"];

interface JokeReport {
 date: string;
 joke: string;
 score: number;
 source?: string;
}

let reportJokes: JokeReport[] = [];
let randomSource: string;

// Nueva función para obtener un chiste de Chuck Norris
async function getRandomChuckNorrisJoke(): Promise<string> {
 try {
  const response = await fetch('https://api.chucknorris.io/jokes/random', {
   headers: { 'Accept': 'application/json' },
  });
  if (!response.ok) {
   throw new Error('Error al obtener el chiste de Chuck Norris');
  }
  const data = await response.json();
  return data.value;
 } catch (error) {
  throw error;
 }
}


// Función para cargar un chiste al cargar la página
async function loadInitialJoke() {
 try {
  let joke: string;
  let source: string;
  const randomSource = Math.random() < 0.5 ? 'dadJoke' : 'chuckNorris'; // 50% de probabilidad de una fuente u otra

  if (randomSource === 'dadJoke') {
   joke = await getRandomJoke();
   source = 'Dad Joke'; // Asigna la fuente
  } else {
   joke = await getRandomChuckNorrisJoke();
   source = 'Chuck Norris'; // Asigna la fuente
  }

  if (jokeElement) {
   jokeElement.textContent = joke;
   const currentDate = new Date().toISOString();
   const jokeReport: JokeReport = { joke, score: 0, date: currentDate, source };
   reportJokes.push(jokeReport);
   console.log('=============================');
   console.log('reportJokes');
   console.table(reportJokes);
  }
 } catch (error) {
  console.error('Error al obtener el chiste:', error);
 }
}


// Comprueba si jokeElement no es nulo antes de usarlo
if (jokeElement) {
 // Llama a la función para cargar el chiste al cargar la página
 loadInitialJoke();

 // Escucha el evento clic en el botón "Siguiente Chiste"
 nextJokeButton?.addEventListener('click', async () => {
  if (colorChangingSvg) {
   const pathElement = colorChangingSvg.querySelector("path");
   if (pathElement) {
    const randomColor = getRandomColorFromArray(colors);
    pathElement.style.fill = randomColor;
   }
  }

  try {
   let joke: string;
   randomSource = Math.random() < 0.5 ? 'dadJoke' : 'chuckNorris'; // Asignar el valor a randomSource

   if (randomSource === 'dadJoke') {
    joke = await getRandomJoke();
   } else {
    joke = await getRandomChuckNorrisJoke();
   }

   if (jokeElement) {
    jokeElement.textContent = joke;
    const currentDate = new Date().toISOString();
    addJokeToReport(joke, 0, randomSource); // Pasa la fuente como tercer argumento
    console.log('=============================');
    console.log('reportAcudits');
    console.table(reportAcudits);
    console.log('=============================');
    console.log('reportJokes');
    console.table(reportJokes);
   }
  } catch (error) {
   console.error('Error al obtener el chiste:', error);
  }
 });

} else {
 console.error('Elemento con ID "joke" no encontrado en el DOM.');
}


// Función para agregar chistes al arreglo reportJokes
function addJokeToReport(joke: string, score: number, source: string) {
 const currentDate = new Date().toISOString();
 // Filtrar el chiste anterior y mantener solo los chistes diferentes
 reportJokes = reportJokes.filter(jokeReport => jokeReport.joke !== joke);
 const jokeReport: JokeReport = { joke, score, date: currentDate, source };
 reportJokes.push(jokeReport);
 /*  console.log('=============================');
  console.log('reportJokes');
  console.table(reportJokes); */
}


// Escucha el evento clic en el botón "Siguiente Chiste"
document.querySelectorAll('.score-button').forEach((button) => {
 button.addEventListener('click', (event) => {
  const target = event.target as HTMLButtonElement;
  const selectedScore = parseInt(target.getAttribute('data-score') || '0');
  if (selectedScore > 0) {
   const jokeText = jokeElement?.textContent || '';
   const currentDate = new Date().toISOString();
   const existingReportItem = reportAcudits.find(item => item.joke === jokeText);
   if (existingReportItem) {
    existingReportItem.score = selectedScore as 1 | 2 | 3;
    existingReportItem.date = currentDate;
   } else {
    const reportItem: ReportAcudit = { joke: jokeText, score: selectedScore as 1 | 2 | 3, date: currentDate };
    reportAcudits.push(reportItem);
    /*     console.log('=============================');
        console.log('reportAcudits');
        console.table(reportAcudits); */
   }
   addJokeToReport(jokeText, selectedScore, randomSource);

  }
 });
});


function getRandomColor() {
 const letters = "0123456789ABCDEF";
 let color = "#";
 for (let i = 0; i < 6; i++) {
  color += letters[Math.floor(Math.random() * 16)];
 }
 return color;
}


function getRandomColorFromArray(colorsArray: string[]) {
 const randomIndex = Math.floor(Math.random() * colorsArray.length);
 return colorsArray[randomIndex];
}
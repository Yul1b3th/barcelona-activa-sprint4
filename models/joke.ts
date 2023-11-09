// Define la interfaz del chiste
interface Joke {
 id: string;
 joke: string;
 status: number;
}

// Función para obtener un chiste aleatorio desde la API
async function getRandomJoke(): Promise<string> {
 try {
  const response = await fetch('https://icanhazdadjoke.com/', {
   headers: { 'Accept': 'application/json' },
  });
  if (!response.ok) {
   throw new Error('Error al obtener el chiste');
  }
  const joke: Joke = await response.json();
  return joke.joke;
 } catch (error) {
  throw error;
 }
}

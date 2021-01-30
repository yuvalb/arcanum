import axios from "axios";

interface Joke {
  setup: string;
  punchline: string;
}

function keyPress(): Promise<void> {
  return new Promise((resolve) =>
    process.stdin.once("data", () => {
      process.stdin.pause();
      resolve();
    })
  );
}

async function getJoke(): Promise<Joke> {
  let jokes: Joke[];

  try {
    jokes = await axios
      .get("https://official-joke-api.appspot.com/jokes/programming/random")
      .then((response) => response.data);
  } catch (err) {
    console.error("Couldn't retrieve joke from server: ", err.message);
    process.exit(1);
  }

  if (!jokes || jokes.length < 1) {
    console.error("No jokes retrieved.");
    return process.exit(1);
  }

  return jokes[0];
}

export default async function () {
  const joke = await getJoke();

  console.log(joke.setup);
  await keyPress();
  console.log(joke.punchline);
}

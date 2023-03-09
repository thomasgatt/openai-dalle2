import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [userInput, setUserInput] = useState("");
  const [result, setResult] = useState("https://britz.mcmaster.ca/images/placeholder.png/image_preview");

  async function onSubmit(event) {

    event.preventDefault();

    try {

      setResult("https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif");

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userInput }),
      });

      const data = await response.json();

      if (response.status !== 200) {

        setResult("https://britz.mcmaster.ca/images/placeholder.png/image_preview");
        throw data.error || new Error(`Request failed with status ${response.status}`);

      }

      console.log("URL Returned " + data.result.data[0].url)
      setResult(data.result.data[0].url);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  }

  return (
    <div>
      <Head>
        <title>OpenAI Image Generation</title>
        <link rel="icon" href="https://ictar.mcast.edu.mt/wp-content/uploads/2021/09/cropped-Screenshot-2021-09-16-at-16.13.12.png" />
      </Head>

      <main className={styles.main}>
        <img src="https://ictar.mcast.edu.mt/wp-content/uploads/2021/09/cropped-Screenshot-2021-09-16-at-16.13.12.png" className={styles.icon} />
        <h3>OpenAI Demo - Image Generation</h3>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            name="text"
            placeholder="Enter an image prompt"
            value={userInput}
            required
            onChange={(e) => setUserInput(e.target.value)}
          />
          <input type="submit" value="Generate image!" />
        </form>

        <h2 style={{marginTop: "40px"}}>Result</h2>
        <img className={styles.result} src={result} />
      </main>
    </div>
  );
}

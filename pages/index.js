import Head from "next/head";
import styles from "../styles/Home.module.css";
import Header from "../components/header";
import TaskList from "../components/tasklist";

export default function Home() {
  return (
    <div>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=yes"
        />
        <meta
          name="description"
          content="Simple Next.js todo web application."
        />
        <title>Next.js TODO App</title>
        <script
          async
          defer
          data-website-id="85c1ab8e-60aa-4349-87b4-50a232399476"
          src="https://umami.davidlaganiere.com/umami.js"
        ></script>
      </Head>

      <Header />

      <main>
        <div className={styles.container}>
          <TaskList></TaskList>
        </div>
      </main>
    </div>
  );
}

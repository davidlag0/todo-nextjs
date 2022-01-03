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

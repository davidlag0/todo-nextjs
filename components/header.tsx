import React from "react";
import styles from "../styles/Header.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  return (
    <nav>
      <ul className={styles.ul}>
        <li className={styles.appTitle}>Tasks List</li>
        {status === "authenticated" ? (
          <>
            <li className={styles.liRight}>
              <span className={styles.loginMessage}>
                Signed in as {session.user.email}
              </span>
              <button className={styles.button} onClick={() => signOut()}>
                Sign out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.liRight}>
              <button onClick={() => signIn("github")}>
                Sign in with GitHub
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

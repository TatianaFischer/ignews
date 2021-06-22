import Head from 'next/head';
import styles from './styles.module.scss';

export default function Posts() {

  return (
    <>
      <Head>
        <title>Posts | Ignews </title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time> 11 de março de 2021</time>
            <strong>titulo do texto</strong>
            <p>Descrição da postagem</p>
          </a>
            <a href="#">
            <time> 11 de março de 2021</time>
            <strong>titulo do texto</strong>
            <p>Descrição da postagem</p>
          </a>
            <a href="#">
            <time> 11 de março de 2021</time>
            <strong>titulo do texto</strong>
            <p>Descrição da postagem</p>
          </a >
            <a href="#">
            <time> 11 de março de 2021</time>
            <strong>titulo do texto</strong>
            <p>Descrição da postagem</p>
          </a>
        </div>
      </main>
    </>
  );
}
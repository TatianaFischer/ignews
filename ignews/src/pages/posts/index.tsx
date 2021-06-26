import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';

import { getPrismicClient } from '../../services/prismic';
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

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient()

  const response = await prismic.query([

    Prismic.predicates.at('document.type', 'publication')
  ], {
    fetch: ['publication.title', 'publication.content'],
    pageSize: 100,
  }
  )

  console.log(response)

  return {
    props: {}
  }
  
}
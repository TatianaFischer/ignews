import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import Head from 'next/head';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';
import styles from './post.module.scss';
interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | Ignews</title>
      </Head>
      <main className={styles.container}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          {/* quando estamos puxando um html, precisamos usar uma proprieade de dentro do 
          elemento react que se chama dangerouslySetInnerHTML. Esse método é perigoso de ser usado, mas nesse caso, como estamos buscando uma informação do prismic e o prismic faz o tratamento para impedir qualquer perigo e script maliciooso, vamos usar ele */}
          <div
            className={styles.postContent}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;
  // if(!session) {
  // }

  //para caerregar o cliente do prismic:
  const prismic = getPrismicClient(req);

  //.getByUID = método que existe dentro do prismic, para buscar qualquer conteúdo atrvés do UID, que nesse caso é exatamento o slug. Como parametro passa o tipo de documento que queremos buscar, que é o publication. E outro parametro que é o slug unico como string.
  //podemos passar ainda, vários outros parametros, nesse caso não queremos passar mais nenhum, mas é obrigatorio escrever ele, então vamos passar um objeto vazio.
  const response = await prismic.getByUID('publication', String(slug), {});

  //formatação dos dados:
  const post = {
    slug,
    title: RichText.asText(response.data.title),
    content: RichText.asHtml(response.data.content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      'pt-BR',
      {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      },
    ),
  };

  return {
    props: {
      post,
    },
  };
};

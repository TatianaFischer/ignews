import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/client';
import { RichText } from 'prismic-dom';
import { getPrismicClient } from '../../services/prismic';

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updated: string;
  };
}

export default function Post({ post }: PostProps) {
  return <h1>Teste</h1>;
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

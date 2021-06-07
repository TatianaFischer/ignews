import { GetStaticProps } from 'next';
import Head from 'next/head';
import { SubscribeButton } from '../components/SubscribeButton';

import { stripe } from '../services/stripe';

import { GetServerSideProps } from 'next';

import styles from './home.module.scss';

interface HomeProps {

  product: {

    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
     <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span> 👏 Hey, welcome</span>
          <h1>Newa about <br/>the <span>React</span> world.</h1>
          <p>Get access to all the publications <br/>
          <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId}/>
        </section>

        <img src="/images/avatar.svg" alt='Menina codando'/>
      </main>
    </>
  
    
  )
}

export const getStaticProps: GetStaticProps = async() => {
//pode ser dessa forma ou como HTTP
//retrieve é quando só quer um dado
//no parâmetro usar o Id do preço/dado que tu quer, é la no site do stripe que se acha products/dados que quer/API ID
//expand: para ter acesso a todas as informações do product, não somente ao preço, isso é uma forma de exemplificar quando ha mais de uma opção de preço, podendo buscar o titulo de cada preço e etc.

//para ver quais os nomes dos dados que podemos buscar é só entrar na documentão do stripe: https://stripe.com/docs/api/prices/retrieve

//preço na documentação é amoutn e ele vem em centavos, por isso a divisão por 100: amount: price.unit_amount / 100 (sempre salvar em centavos no banco de dados)
  const price = await stripe.prices.retrieve('price_1IyxAgJhNHS6L7nvN11WrR3p', {
    expand: ['product']
  })

    const product = {
      priceId: price.id,
      amount: new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(price.unit_amount / 100) ,
    }
  return { 
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, //24 hours
  }
}


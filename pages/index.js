import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import requests from '../utils/requests'

export default function Home({ results }) {
  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={results} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre
  const path = requests[genre]?.url || requests.fetchTrending.url
  const baseUrl = requests.BASE_URL
  const request = await fetch(`${baseUrl}${path}`).then((res) => res.json())
  console.log(`${baseUrl}${path}`)
  return {
    props: {
      results: request.results
    }
  }
}

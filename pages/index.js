import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Header from '../components/Header'
import Nav from '../components/Nav'
import Results from '../components/Results'
import { getMovies } from './api/movie'

export default function Home({results}) {
  const [movies, setMovies] = useState(results)
  const [currentPage, setCurrentPage] = useState(1)
  const [loadingMovie, setLoadingMovie] = useState(false)
  const router = useRouter()
  useEffect(function () {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  },[movies, loadingMovie, currentPage])

  const handleScroll = async () => {
    let tresQuartoDaTela = Math.ceil(window.screen.availHeight / 4) * 3
    let umQuartoDaTela = Math.ceil(window.screen.availHeight / 4)
    let tamanhoDaPagina = document.body.offsetHeight - umQuartoDaTela
    let posicaoAtualScrollVertical = window.scrollY
    let shouldReadMore =
      tresQuartoDaTela + posicaoAtualScrollVertical >= tamanhoDaPagina
    if (loadingMovie == false && shouldReadMore) {
      setLoadingMovie(true);
      let query = router.query
      console.log('genero: ', query.genre)
      let queryString = Object.keys(query)
        .map(function (i) {
          if (i == 'page') {
            return (
              encodeURIComponent(i) +
              '=' +
              encodeURIComponent(currentPage + 1)
            )
          }
          return encodeURIComponent(i) + '=' + encodeURIComponent(query[i])
        })
        .join('&')
        if (queryString.indexOf('page') < 0 ){
          queryString=`${queryString}&page=${currentPage}`;
        }
      console.log('queryString:', queryString);
      if (!loadingMovie){
        let newResult = await fetch(
          `/api/movie?${queryString}`
          )
          .then((res) => res.json())
          .then((json) => json.results)        
        
        setCurrentPage(++currentPage);
        movies.push(...newResult);
        setMovies(movies);
        setLoadingMovie(false)
      }
    }
  }

  return (
    <div>
      <Head>
        <title>Hulu 2.0</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Nav />
      <Results results={movies} />
    </div>
  )
}

export async function getServerSideProps(context) {
  const genre = context.query.genre
  const page = context.query.page || 1
  console.log('pagessss: ', page)
  const request = await getMovies(genre, page)
  console.log('getServerSideProps', genre, page)
  return {
    props: {
      results: request.results,
      page
    }
  }
}

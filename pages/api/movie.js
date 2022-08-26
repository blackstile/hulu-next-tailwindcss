import requests from '../../utils/requests'

export async function getMovies(genre, page) {
  const path = requests[genre]?.url || requests.fetchTrending.url
  const baseUrl = requests.BASE_URL
  const request = await fetch(`${baseUrl}${path}&page=${page}`).then((res) =>
    res.json()
  )
  // console.log(request)
  return request
}

export default async function handler(req, res) {
  const genre = req.query.genre
  const page = req.query.page || 1
  console.log('get Movives page? ', page)
  res.json(await getMovies(genre, page))
}

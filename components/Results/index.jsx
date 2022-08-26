import React from 'react'
import Thumbnail from '../Thumbnail'

function Results({ results }) {
  // console.log("result size: ", results.length)
  // console.log("result", results)
  return (
    <div className="px-5 my-10 sm:grid sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      {results.map((result) => (
        <Thumbnail
          key={result.id}
          result={result}
        />
      ))}
    </div>
  )
}

export default Results

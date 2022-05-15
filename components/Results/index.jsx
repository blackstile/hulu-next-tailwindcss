import React from 'react'
import Thumbnail from '../Thumbnail'
import FlipMove from 'react-flip-move'

function Results({ results }) {
  return (
    <FlipMove duration={750} easing="ease-out">
      <div className="px-5 my-10 sm:grid sm:grid-cols-2  md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
        {results.map((result) => (
          <Thumbnail key={result.id} result={result} />
        ))}
      </div>
    </FlipMove>
  )
}

export default Results

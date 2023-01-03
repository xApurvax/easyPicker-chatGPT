import React from 'react'

const AnimationLetter = ({letterClass,strArr,idx}) => {
  return (
    <span>{strArr.map((char,i) => (
        <span key={char + 1} className={`${letterClass} _${i + idx}`}>
            {char}
        </span>
    ))}</span>
  )
}

export default AnimationLetter
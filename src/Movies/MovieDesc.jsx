import React from 'react'
import toRoman from '../utils/romanNumber'

export default function MovieDesc({ movieDetail }) {
    
    return (
        <div className='box'>
            {movieDetail ?
                <div style={{
                    padding: '5px 15px',
                    letterSpacing: '2px',
                    lineHeight: '2rem'
                    }}>
                    <h3 style={{color:'#20415F'}}>{`Episode ${toRoman(movieDetail.episode_id)} - ${movieDetail.title}`}</h3>
                    <p style={{
                        color: '#4A6075',
                    }}>{movieDetail.opening_crawl}</p>
                    <h5 style={{}}>Directed by: {movieDetail.director}</h5>
                </div> : <p className='no-data'>&quot;No movie selected.&quot;</p>}
        </div>
    )
}

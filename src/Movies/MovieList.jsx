import React from 'react'
import toRoman from '../utils/romanNumber'

const MovieList = ({ movies, handleShowMovieDescription, activeState }) => {

    return (
        <div className='box'>
            <table>
                <tbody>
                    {movies && movies?.map((items) => (
                        <tr className={activeState === items.episode_id ? 'active' : ''} key={items.episode_id} onClick={() => handleShowMovieDescription(items)}>
                            <td style={{ width: '15%' }}>{`EPISODE ${items.episode_id}`}</td>
                            <td style={{ width: '60%' }}>{`EPISODE ${toRoman(items.episode_id)} - ${items.title}`}</td>
                            <td style={{ width: '10%' }}>{items.release_date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MovieList

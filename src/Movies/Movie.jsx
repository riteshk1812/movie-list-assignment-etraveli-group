import React, { useEffect, useState } from 'react'
import MovieList from './MovieList';
import MovieDesc from './MovieDesc';

const API_URL = 'https://swapi.py4e.com/api/films/?format=json';

const Movie = () => {

    const [movies, setMovies] = useState([]);
    const [filterMovieState, setFilterMovieState] = useState([]);

    const [searchTerm, setSearchTerm] = useState('');
    
    const [sortBy, setSortBy] = useState('');
    
    const [movieDetail, setMovieDetail] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // fetch movie data 
    useEffect(() => {
        fetchMovieData()
    }, [])

    const fetchMovieData = async () => {
        try {
            const data = await fetch(API_URL);
            const jsonVal = await data.json();
            setMovies(jsonVal.results);
            setFilterMovieState(jsonVal.results);
        } catch (error) {
            console.error('Error!!');
        }
    }

    // sorting logic starts
    const sortMovie = (list, sortKey) => {
        const sorted = [...list];
        if (sortKey === 'episode') {
            sorted.sort((a, b) => a.episode_id - b.episode_id);
        } else if (sortKey === 'year') {
            sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        }
        return sorted;
    }

    const handleSort = (sortKey) => {
        setSortBy(sortKey);
        const sortedData = sortMovie(filterMovieState, sortKey);
        setMovies(sortedData)
    }

    // search logics
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        
        if (value.trim() !== '') {
            const filteredData = filterMovieState.filter(item =>
                item.title.toLowerCase().includes(value.toLowerCase())
            );
            setMovies(filteredData);
        } else {
            setMovies(filterMovieState);
        }
    }

    // movie desc logic
    const handleClick = async (obj) => {
        setActiveIndex(obj.episode_id);
        try {
            const data = await fetch(obj.url)
            const json = await data.json();
            setMovieDetail(json)
        } catch (error) {
            console.error(`Error msg: ${error.message}`)
        }
    }

    return (
        <div className='Movie'>
            <div className='filters'>
                <div className='sort'>
                    <select 
                        className="custom-select"
                        value={sortBy}
                        onChange={(e) => handleSort(e.target.value)}
                    >
                        <option value="">Sort by...</option>
                        <option value="episode">Episode</option>
                        <option value="year">Year</option>
                    </select>
                </div>
                <div className='search'>
                    <input type='text' onChange={handleChange} value={searchTerm} placeholder='🔍 Type to search...' />
                </div>
            </div>
            <div className='movies-container'>
                <MovieList movies={movies} activeState={activeIndex} handleShowMovieDescription={handleClick} />
                <div className='divider'></div>
                <MovieDesc movieDetail={movieDetail} />
            </div>
        </div>
    )
}

export default Movie

import { createContext, useEffect, useState, ReactNode, useContext } from 'react'
import { api } from '../services/api'

interface GenreResponseProps {
    id: number;
    name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
    title: string;
}

interface MovieProps {
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

interface GenresProviderProps {
    children: ReactNode;
}

interface GenresContextData {
    movies: MovieProps[];
    genres: GenreResponseProps[];
    handleClickButton: (id: number) => void;
    selectedGenreId: Number;
    selectedGenre: GenreResponseProps;
}

const GenresContext = createContext<GenresContextData>(
    {} as GenresContextData
);

export function GenreProvider({ children }: GenresProviderProps) {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>({} as GenreResponseProps);

    useEffect(() => {
        api.get<GenreResponseProps[]>('genres').then(response => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(response => {
            setMovies(response.data);
        });

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(response => {
            setSelectedGenre(response.data);
        })
    }, [selectedGenreId]);


    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <GenresContext.Provider value={{ genres, handleClickButton, movies, selectedGenreId, selectedGenre }}>
            {children}
        </GenresContext.Provider>
    );
}


export function useGenres() {
    const context = useContext(GenresContext);


    return context;
}
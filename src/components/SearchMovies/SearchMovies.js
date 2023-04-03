import { getSearchMovie } from 'components/services/API';
import { Formik } from 'formik';
import { useEffect, useState } from 'react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';
import { Input, SearchForm } from './SearchMovies.styled';
import { PuffLoader } from 'components/Loader/Loader';
import toast, { Toaster } from 'react-hot-toast';

export const SearchMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const params = searchParams.get('query');
  const [movies, setMovies] = useState([]);
  const location = useLocation();
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    if (!params) {
      return;
    }
    const fetchSearchMovies = () => {
      try {
        setLoader(prevState => !prevState);
        getSearchMovie(params).then(resp => setMovies(resp.results));
      } catch (error) {
        console.log(error);
      } finally {
        setLoader(prevState => !prevState);
      }
    };
    if (params) {
      fetchSearchMovies();
    }
  }, [params]);

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />
      {loader && <PuffLoader />}
      <Formik
        initialValues={{ query: '' }}
        onSubmit={(values, actions) => {
          if (!values.query) {
            toast.error(
              'Please enter the title of the movie in the search bar.'
            );
            return;
          }
          setSearchParams(values);
          actions.resetForm();
        }}
      >
        <SearchForm>
          <Input type="text" name="query" autoComplete="off" />
          <button type="submit">Search</button>
        </SearchForm>
      </Formik>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <NavLink to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

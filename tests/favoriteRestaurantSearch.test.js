
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import FavoriteRestaurantSearchPresenter from '../src/scripts/views/pages/favorited-restaurants/favorite-restaurant-search-presenter';
import FavoriteRestaurantView
  from '../src/scripts/views/pages/favorited-restaurants/favorite-restaurant-view';

describe('Searching movies', () => {
  let presenter;
  let favoriteRestaurants;
  let view;

  const searchMovies = (query) => {
    const queryElement = document.getElementById('query');
    queryElement.value = query;

    queryElement.dispatchEvent(new Event('change'));
  };

  const setRestaurantSearchContainer = () => {
    view = new FavoriteRestaurantView();
    document.body.innerHTML = view.getTemplate();
  };
  const constructPresenter = () => {
    favoriteRestaurants = {
      getAllRestaurants: jest.fn(),
      searchMovies: jest.fn(),
    };
    presenter = new FavoriteRestaurantSearchPresenter({
      favoriteRestaurants,
      view,
    });
  };

  beforeEach(() => {
    setRestaurantSearchContainer();
    constructPresenter();
  });

  describe('When query is not empty', () => {

    it('should be able to capture the query typed by the user', () => {
      favoriteRestaurants.searchMovies.mockImplementation(() => []);

      searchMovies('film a');

      expect(presenter.latestQuery).toEqual('film a');
    });

    it('should ask the model to search for liked movies', () => {
      favoriteRestaurants.searchMovies.mockImplementation(() => []);

      searchMovies('film a');

      expect(favoriteRestaurants.searchMovies).toHaveBeenCalledWith('film a');
    });

    it('should show the movies found by Favorite Movies', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated'
        , () => {
          expect(document.querySelectorAll('.cafe-item').length).toEqual(3);

          done();
        });

      favoriteRestaurants.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, name: 'film abc' },
            { id: 222, name: 'ada juga film abcde' },
            { id: 333, name: 'ini juga boleh film a' },
          ];
        }
        return [];
      });

      searchMovies('film a');
    });

    it('should show the name of the movies found by Favorite Movies', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated'
        , () => {
          const movieTitles = document.querySelectorAll('.cafe__title');
          expect(movieTitles.item(0).textContent).toEqual('film abc');
          expect(movieTitles.item(1).textContent).toEqual('ada juga film abcde');
          expect(movieTitles.item(2).textContent).toEqual('ini juga boleh film a');
          done();
        });

      favoriteRestaurants.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [
            { id: 111, name: 'film abc' },
            { id: 222, name: 'ada juga film abcde' },
            { id: 333, name: 'ini juga boleh film a' },
          ];
        }
        return [];
      });

      searchMovies('film a');
    });

    it('should show - when the movie returned does not contain a title', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated'
        , () => {
          const movieTitles = document.querySelectorAll('.cafe__title');
          expect(movieTitles.item(0).textContent)
            .toEqual('-');
          done();
        });

      favoriteRestaurants.searchMovies.mockImplementation((query) => {
        if (query === 'film a') {
          return [{ id: 444 }];
        }

        return [];
      });

      searchMovies('film a');
    });
  });

  describe('When query is empty', () => {

    it('should capture the query as empty', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchMovies(' ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('    ');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('');
      expect(presenter.latestQuery.length).toEqual(0);

      searchMovies('\t');
      expect(presenter.latestQuery.length).toEqual(0);
    });

    it('should show all favorite movies', () => {
      favoriteRestaurants.getAllRestaurants.mockImplementation(() => []);

      searchMovies('    ');
      expect(favoriteRestaurants.getAllRestaurants).toHaveBeenCalled();
    });
  });

  describe('When no favorite movies could be found', () => {

    it('should show the empty message', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated'
        , () => {
          expect(document.querySelectorAll('.movie-item__not__found').length).toEqual(1);

          done();
        });

      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchMovies.mockImplementation((query) => []);

      searchMovies('film a');
    });

    it('should not show any movie', (done) => {
      document.getElementById('cafes').addEventListener('cafes:updated'
        , () => {
          expect(document.querySelectorAll('.cafe-item').length).toEqual(0);

          done();
        });

      // eslint-disable-next-line no-unused-vars
      favoriteRestaurants.searchMovies.mockImplementation((query) => []);

      searchMovies('film a');
    });
  });
});

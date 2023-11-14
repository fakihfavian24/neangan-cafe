import { createRestoItemTemplate } from '../../templates/template-creator';

class FavoriteRestaurantView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
    <div class="content">
    <input id="query" type="text">
    <h2 class="content__heading">Your Favorite restaurant</h2>

      <div id="cafes" class="cafes">
      </div>
    </div>
    </div>
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  // eslint-disable-next-line class-methods-use-this, no-unused-vars
  showFavoriteRestaurants(restaurants) {
    let html;
    if (restaurants.length) {
      html = restaurants.reduce((carry, restaurant) => carry.concat(createRestoItemTemplate(restaurant)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }
    document.getElementById('cafes').innerHTML = html;

    document.getElementById('cafes').dispatchEvent(new Event('cafes:updated'));
  }

  // eslint-disable-next-line class-methods-use-this
  _getEmptyMovieTemplate() {
    return `
      <div class="movie-item__not__found">
        Tidak ada restaurant untuk ditampilkan
      </div>
    `;
  }
}

export default FavoriteRestaurantView;
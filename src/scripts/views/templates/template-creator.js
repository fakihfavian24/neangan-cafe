import CONFIG from '../../globals/config';

const createRestoDetailTemplate = (restaurant) => `
  <h2 class="cafe__title">${restaurant.name}</h2>
  <img class="cafe__poster" src="${CONFIG.BASE_IMAGE_URL + restaurant.pictureId}" alt="${restaurant.name}" crossorigin="anonymous" />
  <div class="cafe__info">
    <h3>Information</h3>
    <h4>city</h4>
    <p>${restaurant.city}</p>
    <h4>address</h4>
    <p>${restaurant.address}</p>
    <h4>Rating</h4>
    <p>${restaurant.rating}</p>
  </div>
  <div class="cafe__overview">
    <h3>Description</h3>
    <p>${restaurant.description}</p>
  </div>
  <div class="cafe__menu">
    <h3>Menu</h3>
    <table>
      <tr>
        <th>Food</th>
      </tr>
      <tr class="list">
      ${restaurant.menus.foods.map((food) => `<td>${food.name}</td>`).join('')}
      </tr>
    </table>
    <br>
    <table>
      <tr>
        <th>Drink</th>
      </tr>
      <tr class="list">
      ${restaurant.menus.drinks.map((drink) => `<td>${drink.name}</td>`).join('')}
      </tr>
    </table>
    <br>
    <br>
    <h3>CustomerReviews</h3>
    <div class="list__review">
    ${restaurant.customerReviews.map((review) => `
        <p>"${review.review}"</p>
        <p>Oleh: ${review.name} (${review.date})</p> 
        <br>
      `).join('')}
      </div>
  </div>
`;

const createRestoItemTemplate = (restaurants) => `
  <div class="cafe-item">
    <div class="cafe-item__header">
      <img class="cafe-item__header__poster lazyload" alt="${restaurants.name || '-'}"
      data-src="${CONFIG.BASE_IMAGE_URL + restaurants.pictureId}" alt="${restaurants.name}" crossorigin="anonymous">
      <div class="cafe-item__header__rating">
        <p>⭐️<span class="cafe-item__header__rating__score">${restaurants.rating || '-'}</span></p>
      </div>
    </div>
    <div class="cafe-item__content">
      <h3 class="cafe__title"><a href="/#/detail/${restaurants.id}">${restaurants.name || '-'}</a></h3>
      <p>${restaurants.description || '-'}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
     <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRestoDetailTemplate,
  createRestoItemTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};

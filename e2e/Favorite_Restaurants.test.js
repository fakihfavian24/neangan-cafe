const assert = require('assert');

// eslint-disable-next-line no-undef
Feature('Favorite Restaurants');

// eslint-disable-next-line no-undef
Before(({ I }) => {
  I.amOnPage('/#/favorite');
});
// eslint-disable-next-line no-undef
Scenario('showing empty liked restaurant', ({ I }) => {

  I.seeElement('#query');

  I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');
});

// eslint-disable-next-line no-undef
Scenario('liking one restaurant', async ({ I }) => {

  I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.waitForElement(".cafe__title a", 10);

  I.seeElement('.cafe__title a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.cafe__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');
  I.seeElement('.cafe-item');

  const likedRestaurantTitle = await I.grabTextFrom('.cafe__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

// eslint-disable-next-line no-undef
Scenario('Unliking one restaurant', async ({ I }) => {
  I.amOnPage('/');

  I.waitForElement(".cafe__title a", 10);

  I.seeElement('.cafe__title a');
  // eslint-disable-next-line no-undef
  const firstRestaurant = locate('.cafe__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorite');

  const unlikedRestaurantTitle = await I.grabTextFrom('.cafe__title');

  assert.strictEqual(firstRestaurantTitle, unlikedRestaurantTitle);
});

// eslint-disable-next-line no-undef
Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restaurant untuk ditampilkan', '.movie-item__not__found');

  I.amOnPage('/');

  I.seeElement('.cafe__title a');

  const titles = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= 3; i++) {
    // eslint-disable-next-line no-undef
    I.click(locate('.cafe__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    // eslint-disable-next-line no-await-in-loop
    titles.push(await I.grabTextFrom('.cafe__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorite');
  I.seeElement('#query');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.cafe-item');
  assert.strictEqual(titles.length, visibleLikedRestaurants);

  const searchQuery = titles[1].substring(1, 3);
  I.fillField('#query', searchQuery);
  I.pressKey('Enter');
  // mendapatkan daftar film yang sesuai dengan searchQuery
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);
  const visibleSearchedLikedRestaurants = await I.grabNumberOfVisibleElements('.cafe-item');
  assert.strictEqual(matchingRestaurants.length, visibleSearchedLikedRestaurants);
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < matchingRestaurants.length; i++) {
    // eslint-disable-next-line no-await-in-loop, no-undef
    const visibleTitle = await I.grabTextFrom(locate('.cafe__title').at(i + 1));
    assert.strictEqual(matchingRestaurants[i], visibleTitle);
  }
});
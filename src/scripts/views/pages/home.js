import RestaurantSource from '../../data/restaurant-source';
import { createRestoItemTemplate } from '../templates/template-creator';

const Home = {
  async render() {
    return `
      <div class="jumbotron">
      <h1>Selamat Datang di NeanganCafe!</h1>
      </div>
      <section id="about" class="about">
      <article class="about-neangancafe">
        <figure class="figure-neangancafe">
          <img src="./images/heros/hero-image_1.jpg" alt="About NeanganCafe" />
        </figure>
        <div class="content-neangancafe">
          <h1 class="title-neangancafe">Sekilas Tentang NeanganCafe!</h1>
          <hr class="hr-title">
          <p class="description-neangancafe">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus eum
            facere nostrum officiis qui quidem ratione similique, soluta veniam
            voluptatum. Accusantium ad amet asperiores, aut commodi corporis dicta
            distinctio ducimus expedita itaque laudantium magnam maiores, nobis
            obcaecati officiis provident quasi qui quos repellat rerum saepe sint soluta
            veniam vero vitae, voluptas voluptate voluptatem. Esse nobis non nulla optio
            vero. Laudantium!
          </p>
          <button class="button-neangancafe">Read More</button>
        </div>
      </article>
      </section>
      <div class="content">
      <h2 id="cafes-title" class="title">Rekomendasi Cafe</h2>
        <div id="cafes" class="cafes">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const restaurants = await RestaurantSource.getAllRestaurants();
    const cafesContainer = document.querySelector('#cafes');
    restaurants.forEach((cafe) => {
      cafesContainer.innerHTML += createRestoItemTemplate(cafe);
    });
  },
};

export default Home;

import { Component } from "../core/denev";
import movieStore, { getMovieDetails } from "../store/movie";

export default class Movie extends Component {
  async render() {
    this.el.classList.add("container", "the-movie");
    this.el.innerHTML = /* html */ `
        <div class="poster skeleton"></div>
        <div class="specs">
            <div class="title skeleton"></div>
            <div class="labels skeleton"></div>
            <div class="plot skeleton"></div>
        </div>
    `;

    await getMovieDetails(history.state.id);
    const {
      movie: {
        Poster,
        Title,
        Released,
        Runtime,
        Country,
        Plot,
        Actors,
        Director,
        Production,
        Genre,
        Ratings,
      },
    } = movieStore.state;

    const bigPoster = Poster.replace("SX300", "SX700");

    this.el.innerHTML = /* html */ `
        <div class="poster" style="background-image: url(${bigPoster})"></div>
        <div class="specs">
            <div class="title">${Title}</div>
            <div class="labels">
                <span>${Released}</span>
                &nbsp;/&nbsp;
                <span>${Runtime}</span>
                &nbsp;/&nbsp;
                <span>${Country}</span>
            </div>
            <div class="plot">
                ${Plot}
            </div>
            <div>
                <h3>Ratings</h3>
                ${Ratings.map((rating) => {
                  return `<p>${rating.Source} - ${rating.Value}</p>`;
                }).join("")}
            </div>
            <div>
                <h3>Actors</h3>
                <p>${Actors}</p>
            </div>
            <div>
                <h3>Director</h3>
                <p>${Director}</p>
            </div>
            <div>
                <h3>Production</h3>
                <p>${Production}</p>
            </div>
            <div>
                <h3>Genre</h3>
                <p>${Genre}</p>
            </div>
        </div>
    `;
  }
}

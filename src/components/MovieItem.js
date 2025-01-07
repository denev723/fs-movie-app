import { Component } from "../core/denev";

export default class MovieItem extends Component {
  constructor(props) {
    super({
      props,
      tagName: "a",
    });
  }
  render() {
    const {
      movie: { Poster, Title, Year, imdbID },
    } = this.props;

    this.el.setAttribute("href", `#/movie?id=${imdbID}`);
    this.el.classList.add("movie");
    this.el.style.backgroundImage = `url(${Poster})`;
    this.el.innerHTML = /* html */ `
        <div class="info">
            <div class="year">
                ${Year}
            </div>
            <div class="title">
                ${Title}
            </div>
        </div>
    `;
  }
}

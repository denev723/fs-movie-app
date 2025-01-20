import { Component } from "../core/denev";
import { ISearch as SimpleMovie } from "../store/movie";

interface IProps {
  [key: string]: unknown;
  movie: SimpleMovie;
}

export default class MovieItem extends Component {
  public props!: IProps;
  constructor(props: IProps) {
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

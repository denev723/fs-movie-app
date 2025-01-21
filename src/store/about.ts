import { Store } from "../core/denev";

interface IState {
  photo: string;
  name: string;
  email: string;
  blog: string;
  github: string;
  repository: string;
}

export default new Store<IState>({
  photo: "https://heropy.blog/css/images/logo.png",
  name: "Denev / Kim Byeongjoo",
  email: "denev723@gmail.com",
  blog: "https://blog.naver.com/denev723",
  github: "https://github.com/denev723",
  repository: "https://github.com/denev723/fs-movie-app",
});

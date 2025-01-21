import { Component } from "../core/denev";
import chatStore, { sendMessages } from "../store/chatbot";
import movieStore, { searchMovies } from "../store/movie";

export default class Chatbot extends Component {
  constructor() {
    super();
    chatStore.subscribe("messages", () => this.render());
    chatStore.subscribe("isLoading", () => this.render());
  }
  render() {
    console.log(chatStore.state.messages);
    this.el.classList.add("chatbot");
    this.el.innerHTML = /* html */ `
            <div class="chats">
                <ul>
                    ${chatStore.state.messages
                      .map(
                        (msg) => /* html */ `
                            <li class="${msg.role}">
                                ${
                                  msg.role === "assistant"
                                    ? /* html */ `
                                        <div class="photo">
                                            <span class="material-symbols-outlined">smart_toy</span>
                                        </div>
                                    `
                                    : ""
                                }
                                ${
                                  typeof msg.content === "string"
                                    ? msg.content.replace(
                                        /{{(.*?)\/\/(.*?)}}/g,
                                        (match, ko, en) =>
                                          /* html */ `<span class="movie-title" data-movie-title="${en}">${ko}</span>`
                                      )
                                    : ""
                                }
                            </li>
                        `
                      )
                      .join("")}
                      ${
                        chatStore.state.isLoading
                          ? /* html */ `
                            <li class="assistant">
                                <div class="photo">
                                    <span class="material-symbols-outlined">smart_toy</span>
                                </div>
                                <div class="the-loader"></div>
                            </li>
                        `
                          : ""
                      }
                </ul>
                <div class="input">
                    <input type="text" />
                    <button class="btn btn-primary">
                        <span class="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
            <div class="btn btn-circle chat-starter">
                <span class="material-symbols-outlined icon--open">chat</span>
                <span class="material-symbols-outlined icon--close">close</span>
            </div>
        `;

    const inputEl = this.el.querySelector("input");
    const btnEl = this.el.querySelector("button");
    const chatStarterEl = this.el.querySelector(".chat-starter");
    chatStarterEl?.addEventListener("click", (e: Event) => {
      e.stopPropagation();
      this.el.classList.toggle("chatbot--on");
      const offChats = () => this.el.classList.remove("chatbot--on");
      if (this.el.classList.contains("chatbot--on")) {
        window.addEventListener("click", offChats);
        setTimeout(() => {
          inputEl?.focus();
        }, 300);
      } else {
        window.removeEventListener("click", offChats);
      }
    });

    inputEl?.addEventListener("input", () => {
      chatStore.state.chatText = inputEl.value;
    });

    inputEl?.addEventListener("keydown", (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === "Enter" && !e.isComposing) {
        sendMessages();
      }
    });

    btnEl?.addEventListener("click", () => {
      sendMessages();
    });

    const chatEl = this.el.querySelector(".chats");
    chatEl?.addEventListener("click", (e: Event) => {
      e.stopPropagation();
    });

    const msgListEl = this.el.querySelector(".chats ul");
    msgListEl?.scrollTo(0, msgListEl.scrollHeight || 0);

    inputEl?.focus();

    const movieTitleEls = this.el.querySelectorAll<HTMLElement>(".movie-title");
    movieTitleEls.forEach((movieTitleEl) => {
      movieTitleEl.addEventListener("click", () => {
        const searchInputEl =
          document.querySelector<HTMLInputElement>(".search input");
        if (!searchInputEl) return;
        const title = movieTitleEl.dataset.movieTitle || "";
        searchInputEl.value = title;
        movieStore.state.searchText = title;
        searchMovies(1);
      });
    });
  }
}

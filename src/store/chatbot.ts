import { Store } from "../core/denev";
import OpenAI from "openai";

interface State {
  chatText: string;
  messages: OpenAI.ChatCompletionMessageParam[];
  isLoading: boolean;
}
const defaultMessages: OpenAI.ChatCompletionMessageParam[] = [
  { role: "assistant", content: "좋아하는 영화 장르나 제목을 알려주세요." },
];
const store = new Store<State>({
  chatText: "",
  messages: defaultMessages,
  isLoading: false,
});

export default store;

export const sendMessages = async () => {
  if (!store.state.chatText.trim()) return;
  if (store.state.isLoading) return;
  store.state.isLoading = true;
  store.state.messages = [
    ...store.state.messages,
    { role: "user", content: store.state.chatText },
  ];
  try {
    const res = await fetch("/api/chatbot", {
      method: "POST",
      body: JSON.stringify({
        messages: store.state.messages,
      }),
    });
    const { message } = await res.json();
    store.state.messages = [...store.state.messages, message];
    store.state.chatText = "";
  } catch (error) {
    console.log("sendMessages error:", error);
  } finally {
    store.state.isLoading = false;
  }
};
export const resetMessages = () => {
  store.state.messages = defaultMessages;
};

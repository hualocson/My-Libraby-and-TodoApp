import { createStore } from "./core.js";
import reducer from "./reducer.js";

const { attach, connect, dispatch } = createStore(reducer);

// === Biến dispatch làm biến global
window.dispatch = dispatch;

export { attach, connect };

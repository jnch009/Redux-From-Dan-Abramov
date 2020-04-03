import throttle from "lodash/throttle";
import { createStore } from "redux";

import { loadState, saveState } from "./localStorage";
import todoApp from "./reducers/index";

import "./styles.css";

const configureStore = () => {
  const persistedState = loadState();
  const store = createStore(
    todoApp,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

  store.subscribe(
    throttle(() => {
      saveState({ todos: store.getState().todos });
    }, 1000)
  );

  console.log(store.getState());

  return store;
};

export default configureStore;

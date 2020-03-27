// const reduxStoreFromScratch = () => {
//   const createScratchStore = reducer => {
//     let state;
//     let listeners = [];
//     const getState = () => state;
//     const dispatch = action => {
//       state = reducer(state, action);
//       listeners.forEach(listener => listener());
//     };
//     const subscribe = listener => {
//       listeners.push(listener);
//       return () => {
//         listeners = listeners.filter(l => l !== listener);
//       };
//     };

//     //to set the initial state
//     dispatch({});

//     return { getState, dispatch, subscribe };
//   };
//   return createScratchStore(counter);
// };
//let scratchReduxStore = reduxStoreFromScratch();

// const toggleTodo = todo => {
//   //todo.completed = !todo.completed; mutation
//   //Object. assign
//   // return Object.assign({}, todo, { completed: !todo.completed });
//   //Spread
//   return { ...todo, completed: !todo.completed };
// };

//Reducer Composition with Objects
//these reducers are combined but also INDEPENDENT of each other!
// const todoApp = (state = {}, action) => {
//   return {
//     todos: todos(state.todos, action),
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action)
//   };
// };

//Create combineReducers from scratch
// const combineReducersScratch = reducers => {
//   return (state = {}, action) => {
//     return Object.keys(reducers).reduce((nextState, key) => {
//       nextState[key] = reducers[key](state[key], action);
//       return nextState;
//     }, {});
//   };
// };
// const todoApp = combineReducersScratch({
//   todos,
//   visibilityFilter
// });

// console.log(store.getState());
//   console.log("-------");
//   // store.dispatch({
//   //   type: "ADD_TODO",
//   //   id: 1,
//   //   text: "Finish your homework"
//   // });
//   console.log(store.getState());
//   console.log("-------");
//   // store.dispatch({
//   //   type: "SET_VISIBILITY_FILTER",
//   //   id: 1,
//   //   filter: "ONLY_MINE"
//   // });
//   console.log(store.getState());

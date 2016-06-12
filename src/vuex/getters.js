export function user(state) {
  let data = null;
  if (state.user) data = state.user;
  return data;
}

export function lang(state) {
  return state.lang;
}

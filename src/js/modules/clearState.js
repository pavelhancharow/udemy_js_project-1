const clearState = (state) => {
  for (const key in state) {
    delete (state[key]);
  }
};

export default clearState;
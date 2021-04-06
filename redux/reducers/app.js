import { DARK_MODE_SET } from "../actions/types";

const initialState = {
  isDarkMode: null
};

export default function reducer(state = initialState, action) {
  const { type, payload } = action;

  if (typeof window === "undefined") {
    // don't do anything when we are on the server
    return state;
  }

  switch (type) {
    case DARK_MODE_SET:
      return {
        ...state,
        isDarkMode: payload
      };

    default: {
      return state;
    }
  }
}

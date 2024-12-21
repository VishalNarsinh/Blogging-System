// isLoggedIn to check if token exists in the local storage
export const isLoggedIn = () => {
  let data = localStorage.getItem("data");
  if (data != null) {
    return true;
  } else {
    return false;
  }
};

// doLogin to set the token in the local storage
export const doLogin = (data, next) => {
  localStorage.setItem("data", JSON.stringify(data));
  next();
};

// doLogout to remove the token from the local storage
export const doLogout = (next) => {
  // Remove tokens and username from local storage
  localStorage.removeItem("data");
  next();
};

// getCurrentUser to get current user
export const getCurrentUser = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data")).user;
  } else {
    return null;
  }
};

export const getTokens = () => {
  if (isLoggedIn()) {
    return JSON.parse(localStorage.getItem("data"));
  } else {
    return null;
  }
};

export const updateLoggedInUser = (data) => {};

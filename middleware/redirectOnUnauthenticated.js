async function redirectOnUnauthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.json('You are not logged in!');
  }
}

export default redirectOnUnauthenticated;

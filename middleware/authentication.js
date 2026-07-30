module.exports = (req, res, next) => {
  if(!globalThis.user_id) {
    return res.status(401).json({message: "Unauthenticated"});
  }

next();
}

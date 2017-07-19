module.exports = {
  	me: function(req, res, next) {
  		if (!req.user) {
  			return res.status(200).json(null);
  		}
  		return res.status(200).send(req.user);
  }
}
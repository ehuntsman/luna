module.exports = {
  	me: function(req, res, next) {
          console.log("im a chicken man", req.user )
  		if (!req.user) {
  			return res.status(200).json(null);
  		}
          console.log(req.user, "i'mt he type of user")
  		return res.status(200).send(req.user);
  }
}
module.exports = {
	me: function(req, res, next) {
		if (!req.user) {
			return res.status(200).json(null);
		}
			return res.status(200).send(req.user);
	},
	getAll: function(req,res, next) {
		const dbInstance = req.app.get('db');
		dbInstance.get_all_users().then( users => {
			res.status(200).send(users)
		}).catch( (err) => {
			console.log(err)
			res.status(500).send(err)
		})
	},
	getOneUser: function(req,res) {
		const dbInstance = req.app.get('db');
		const {params} = req;
		dbInstance.getUser([params.id])
		.then( user => res.status(200).send(user[0]) )
		.catch( () => res.status(500).send() );
  },
	updateTeamName: function(req,res,next){
		const dbInstance = req.app.get('db');
		console.log(req, "some console for the soul of the updateteamname", req.params.id);
		dbInstance.update_teamname([req.body.name, req.params.id]).then( user => {
			res.status(200).send(user)
		}).catch( (err) => {
			res.status(500).send(err)
		})
	},
	update: function(req,res,next){
		const dbInstance = req.app.get('db');
		console.log(req.body, "this is the new team in my functions server")
		dbInstance.update_user([req.body, req.params.id]).then( user => {
			res.status(200).send(user)
		}).catch( (err) => {
			console.log(err)
			res.status(500).send(err)
		})
	},
	checkProgress: function(req, res, next){
		const dbInstance = req.app.get('db');
		dbInstance.get_progress(req.params.id).then( progress => {
			res.status(200).send(progress)
		}).catch( (err) => {
			console.log(err)
			res.status(500).send(err)
		})
	},
	postProgress: function(req, res, next){
		const dbInstance = req.app.get('db');
		console.log(req.body, "this is the body for the post progress");
		dbInstance.addNewProgress(req.body.userid, req.body.charid).then( progress => {
			res.status(200).send(progress)
		}).catch( (err) => {
			console.log(err)
			res.status(500).send(err)
		})
	}
}
module.exports = {
    getAll: function(req, res, next){
        const dbInstance = req.app.get('db');
        dbInstance.read_characters()
        .then( characters => res.status(200).send(characters) )
        .catch( () => res.status(500).send() );
    }
}
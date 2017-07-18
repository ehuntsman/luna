module.exports = {
    getAllCharacters: function(req, res, next){
        const dbInstance = req.app.get('db');
        dbInstance.read_characters()
        .then( characters => res.status(200).send(characters) )
        .catch( () => res.status(500).send() );
    },
    getOneCharacter: function(req, res, next){
        const dbInstance = req.app.get('db');
        const {params} = req;
        dbInstance.read_character([params.id])
        .then(character => res.status(200).send(character[0]))
        .catch(() => res.status(500).send());
    }
    
}
module.exports = {
    getAllAttacks: function(req, res, next){
        const dbInstance = req.app.get('db');
        dbInstance.read_attacks()
        .then( attacks => res.status(200).send(attacks) )
        .catch( () => res.status(500).send() );
    }
}
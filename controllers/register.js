

const handleRegister = (req, res, db, bcrypt) => {
    const { email, name, password } = req.body;

    if (!email || !name || !password ) {
        return res.status(400).json('Incorrect form submission')
    }

    const hash = bcrypt.hashSync(password);

    // bcrypt.hash(password, null, null, function(err, hash) { console.log(hash);}); // Store hash in your password DB.
    //     // Load hash from your password DB.
    // bcrypt.compare("apples", '$2a$10$7Xm2.sbfobfDlr99T.5C3upXJmswgvG6WZVfYjjptRzmwoSWn.2pa', function(err, res) { console.log('first guess' + res);});
    // bcrypt.compare("veggies", '$2a$10$7Xm2.sbfobfDlr99T.5C3upXJmswgvG6WZVfYjjptRzmwoSWn.2pa', function(err, res) { console.log('second guess' + res);});
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
        .into('login')
        .returning('email')
        .then(loginEmail => {
            return trx('users')
            .returning('*') //users insert ann and return all the columns
            .insert({ // ovo upisuje podatke o useru koga smo mi uneli kroz postman
                email: loginEmail[0],
                name: name,
                joined: new Date()
            })
            .then(user => {
                res.json(user[0]); //grabs the last user in the array
                })
        })
        .then(trx.commit)
        .catch(trx.rollback)
    }) 
    .catch(err => res.status(400).json('unable to register'))
}

module.exports = {
    handleRegister: handleRegister
};
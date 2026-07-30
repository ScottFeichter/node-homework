let register = (req, res) => {
    let {name, email, password} = req.body;

    let user = {
        name: name,
        email: email,
        password: password
    }

    global.users.push(user);
    global.user_id = user;

    res.status(201)
    res.json({name: user.name, email: user.email});

}

let logon = (req, res) => {

    let {email, password} = req.body;

    let user = global.users.find(user => user.email == email && user.password == password);

    if(!user){
        res.status(401);
        return res.json({error: "Invalid Credentials"});
    }

    global.user_id = user;

    res.status(200);
    res.json({name: user.name, email: user.email});
}

let logoff = (req, res) => {

    global.user_id = null;

    res.status(200);

}


module.exports = { register, logon, logoff};

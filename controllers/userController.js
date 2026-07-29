const crypto = require("crypto");
const util = require("util");
const { userSchema } = require("../validation/userSchema");



const scrypt = util.promisify(crypto.scrypt);



async function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, 64);
  return `${salt}:${derivedKey.toString("hex")}`;
}

async function comparePassword(inputPassword, storedHash) {
  const [salt, key] = storedHash.split(":");
  const keyBuffer = Buffer.from(key, "hex");
  const derivedKey = await scrypt(inputPassword, salt, 64);
  return crypto.timingSafeEqual(keyBuffer, derivedKey);
}



let register = async (req, res) => {

    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    if(error) return res.status(400).json({errors: error.details.map(detail => detail.message)})

    let {name, email, password} = value;

    const hashedPassword = await hashPassword(password);

    const newUser = {
        email,
        name,
        hashedPassword,
    };

    global.users.push(newUser);
    global.user_id = newUser;

    res.status(201)
    res.json({name: newUser.name, email: newUser.email});

}

let logon = async (req, res) => {

    let {email, password} = req.body;

    let user = global.users.find(user => user.email == email);

    if(!user){
        res.status(401);
        return res.json({error: "User Not Found"});
    }

    const goodCredentials = await comparePassword(
        password,
        user.hashedPassword,
    );

    if (!goodCredentials) {
        res.status(401);
        return res.json({ error: "Invalid credentials" });
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

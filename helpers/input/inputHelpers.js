const bcrypt = require("bcryptjs")

const validateUserInput = (email, password) => {

    return email && password;
    // email ve password varsa true bir tanesi bile yoksa false döner

}

const comparePassword = (password,hashedPassword) => {

    return bcrypt.compareSync(password,hashedPassword);
    // hashlenmiş password decode edilip password ile karşılaştırılcak aynı ise true değilse false döner.
}


module.exports = {
    validateUserInput,
    comparePassword
}
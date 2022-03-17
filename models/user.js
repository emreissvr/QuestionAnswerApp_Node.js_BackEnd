const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
const crypto = require("crypto");


const UserSchema = new Schema({

    name:{
        type: String,
        required: [true,"please provide a name"], // eğer true olursa veya olmazsa
    },
    email:{
        type:String,
        required: [true,"Please provide a name"], 
        unique:true,
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            "Please provide a valid email"
        ] // email regex  validation ekliyoruz
    },
    role:{
        type:String,
        default:"user", // role admn ise "admin" yaz
        enum: ["user","admin"] // yani bu rolün iki tane değeri olabilir user ve admin demek istiyoruz.
    },
    password:{
        type:String,
        minlength: [6,"please provide a password with min length : 6"],
        required:[true,"please provide a password"],
        select: false // herhangi bir bilgi kullanıcı bilgisi çekildiğinde şifrenin görünmemesi için bu ayar yapılır güvenlik amacıyla yapılır
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    title:{
        type:String
    },
    about:{
        type:String
    },
    place:{
        type:String
    },
    website:{
        type:String
    },
    profile_image:{
        type:String,
        default:"default.jpg"
    },
    blocked:{
        type:Boolean,
        default:false,
    },

    resetPasswordToken:{
        type:String,
    },
    resetPasswordExpire:{
        type:Date,
    }

});


// UserSchema Methods
UserSchema.methods.generateJwtFromUser = function () {

    const {JWT_SECRET_KEY,JWT_EXPIRE} = process.env;
    // payload objesini oluşturucaz
    const payload = {
        id: this._id,
        name: this.name
    };
    // aynı zamanda bize secret key ve inspare süresi gerekli
    const token = jwt.sign(payload,JWT_SECRET_KEY, {
        expiresIn : JWT_EXPIRE
    });
    return token;
}
 
// reset password 
UserSchema.methods.getResetPasswordTokenFromUser = function() {

    const randomHexString = crypto.randomBytes(15).toString("hex")  // 15 tane byte token üretecek bu sayı değiştirilebilir sonra hexadecimal değerlerin olduğu bir string ürettik
    // reset password expire süresi config.env içerisinde verildi
    const { RESET_PASSWORD_EXPIRE } = process.env; 
    const resetPasswordToken = crypto.createHash("SHA256").update(randomHexString).digest("hex");
    
    this.resetPasswordToken = resetPasswordToken; // buradaki token userschema objemizin resetPasswordToken'a atandı
    this.resetPasswordExpire = Date.now() + parseInt(RESET_PASSWORD_EXPIRE);

    return resetPasswordToken;

}




// password hashing
UserSchema.pre("save",function(next){
    // parola dışındaki özellikler değişebilir ama parola update edilmemişse hashlenmiş kısmı değiştirmeye gerek yok
    if (!this.isModified("password")) {
        next(); 
    }
      
    bcrypt.genSalt(10, (err, salt) => {
        if (err) next(err); 
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) next(err);
            // eğer herhangi bri hata olmamışsa parola hashlenmiş demektir
            this.password = hash;
            next(); // next() diyerekte uygulamamıza devam ettik 
 
        });
    });
})



module.exports = mongoose.model("User",UserSchema);
// biz burdan herhangi bir user eklemesi yaparsak veritabanında "users" adlı collection(table) açacak



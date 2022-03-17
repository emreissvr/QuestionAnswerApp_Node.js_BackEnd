class CustomError extends Error {

    constructor(message,status){
        // bu mesajı direkt Error class'ı içinde başlatabiliriz buda super() parametresiyle yapılır
        super(message);
        // error classında status olmadığı için status burda tanımlanır
        this.status = status;
    }

};


module.exports = CustomError;
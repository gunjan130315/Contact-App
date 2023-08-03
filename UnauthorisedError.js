const BaseError = require("./BaseError")
class Unauthorised extends BaseError{
    constructor(specificMessage){
        super("UnauthorisedError", "Unauthorised Access", 401)
        this.specificMessage = specificMessage
    }
}

module.exports = Unauthorised


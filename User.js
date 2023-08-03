const Contact = require("./Contact");
const UnAuthorisedError = require("./UnauthorisedError");
const ValidationError = require("./ValidationError");
const NotFound = require("./NotFound")

class User {
    static Id = 0;
    static allUsers = []
    constructor(fullName, gender, country, isAdmin) {
        this.Id = User.Id++
        this.fullName = fullName
        this.gender = gender
        this.country = country
        this.isAdmin = isAdmin
        this.contacts = []
    }
    
    newUser(fullName, gender, country) { 
        try { 
            if (!this.isAdmin) { 
                throw new UnAuthorizedError("You are not An Admin") 
            } 
            if (typeof fullName != "string") { 
                throw new ValidationError("Invalid FullName") 
            } 
            let userObj = new User(fullName, gender, country, false) 
            User.allUsers.push(userObj) 
            return userObj 
        }  
        catch (error) { 
            return error 
        } 
    }

    static newAdmin(fullName, gender, country) {
        try{
        if (typeof fullName != "string") {
            throw new ValidationError("invalid full name")
        }
        return new User(fullName, gender, country, true)
    } catch(error) {
        return error 
    }
}

    getAllUsers() { 
        try{
        if (!this.isAdmin) {
           throw new UnAuthorizedError("UnAuthorized")
        }
        return User.allUsers
    }
    catch(error) {
        return error
    }
}

    findUser(userID) {
    try {
        if (!this.isAdmin) {
            throw new UnAuthorizedError("you are not admin")
        }
        if (typeof userID != "number") {
            throw new ValidationError("user ID invalid input")
        }
        for (let index = 0; index < User.allUsers.length; index++) {
            if (userID == User.allUsers[index].Id) {
                return index
            }
        }
        throw new NotFound("user ID not found") 
    } catch (error) {
        throw error }
    }

    updateUser(userId, parameter, newValue) {
        try {
            if (typeof userId != "number") {
                throw new ValidationError("user ID is not valid")
            }
            if (!this.isAdmin) {
                throw new UnAuthorizedError("you are not admin")
            }
            let indexOfUser = this.findUser(userId)
            switch (parameter) {
                case "fullName": if (typeof newValue != "string") { throw new ValidationError("full name is not valid") }
                    User.allUsers[indexOfUser].fullName = newValue
                    return User.allUsers[indexOfUser]
                case "gender": if (typeof newValue != "string") { throw new ValidationError("gender is not valid") }
                    User.allUsers[indexOfUser].gender = newValue
                    return User.allUsers[indexOfUser]
                case "country": if (typeof newValue != "string") { throw new ValidationError("country is not valid") }
                    User.allUsers[indexOfUser].country = newValue
                    return User.allUsers[indexOfUser]
                default: throw new NotFound("parameter not found") 
            }
        } catch (error) {
            return error
        }
    }

    deleteUser(userId) {
        try {
            if (typeof userId != "number") {
                throw new ValidationError("user ID is not valid")
            }
            if (!this.isAdmin) {
                throw new UnAuthorizedError("you are not admin")
            }
            let indexOfUser = this.findUser(userId)
            User.allUsers.splice(indexOfUser, 1)
            return User.allUsers
        } catch (error) {
            return error
        }
    }

    createContact(fullName) {
            try {
                if(this.isAdmin){
                    throw new UnAuthorizedError("you are admin")
                }
                if (typeof fullName != "string") {
                    throw new ValidationError("full name is not valid")  
                }
                let createdContact = new Contact(fullName)
                this.contacts.push(createdContact)
            } catch (error) {
                return error
            }
    }

    getAllContact() {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            return this.contacts
        } catch (error) {
            return error
        }
    }

    findContact(contactId) {
        try {
            for (let i = 0; i < this.contacts.length; i++) {
                if (contactId == this.contacts[i].getContactId()) {
                    return i
                }
            }
            throw new NotFound("contact ID not found")
        } catch (error) {
            throw error
        }
    }

    updateContact(contactId, newValue) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            if (typeof newValue != "string") {
                throw new ValidationError("full name is not valid")
            }
            this.contacts[indexOfContact].updateContactFullName(newValue)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    deleteContact(contactId) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts.splice(indexOfContact, 1)
        } catch (error) {
            return error
        }
    }

    createContactInfo(contactId, typeOfContact, valueOfContact) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].createContactInfo(typeOfContact, valueOfContact)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    getAllContactInfo(contactId) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].getAllContactInfo()
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    updateContactInfo(contactId, contactInfoId, newValue) {
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].updateContactInfo(contactInfoId, newValue)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    deleteContactInfo(contactId, contactInfoId){
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if (typeof contactId != "number") {
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            this.contacts[indexOfContact].deleteContactInfo(contactInfoId)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    getUserById(userId){
        try {
            if(!this.isAdmin){
                throw new UnAuthorizedError("you are not admin")
            }
            if(typeof userId != "number"){
                throw new ValidationError("user ID is not valid")
            }
            let indexOfUser = this.findUser(userId)
            return User.allUsers[indexOfUser]
        } catch (error) {
            return error
        }
    }

    getContactById(contactId){
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if(typeof contactId != "number"){
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            return this.contacts[indexOfContact]
        } catch (error) {
            return error
        }
    }

    getContactInfoById(contactId, contactInfoId){
        try {
            if(this.isAdmin){
                throw new UnAuthorizedError("you are admin")
            }
            if(typeof contactId != "number"){
                throw new ValidationError("contact ID is not valid")
            }
            let indexOfContact = this.findContact(contactId)
            return this.contacts[indexOfContact].getContactInfoById(contactInfoId)
        } catch (error) {
            return error   
        }
    }

}

let a = User.newAdmin("Gunjan", "F", "IND")
let u1 = a.newUser("Tanu", "F", "IND")
let u2 = a.newUser("Neel", "M", "IND")


u1.createContact("Neel")
u1.createContact("Gunjan")
console.log(u1.getAllContact());

u1.createContactInfo(1, "mobile", 9326068780)
console.log(a.getUserById(1));
console.log(u1.getContactInfoById(0,0));
console.log(a.getAllUsers());
console.log(u1.getAllContact());
console.log(a.getAllUsers());
// a.updateUser(2, "fullName", "ghadigaonkar")
// console.log(u1.getAllContactInfo(0));
// console.log("-------------------------");
// console.log(u1.updateContactInfo(0, 0, "yashshjs"));
// console.log(u1.getAllContactInfo(1));
//u1.updateContact(0, "ghadigaonkar")
// u1.deleteContact(2)
//console.log(u1.getContactById(0));

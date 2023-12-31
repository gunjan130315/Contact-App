const ContactInfo = require("./ContactInfo")
const NotFound = require("./NotFound")
const ValidationError = require("./ValidationError")
const UnAuthorisedError = require("./UnauthorisedError")

class Contact {
    static Id = 0
    constructor(fullName) {
        this.Id = Contact.Id++
        this.fullName = fullName
        this.contactInfo = []
    }

    getContactId(){
        return this.Id;
    }

    updateContactFullName(newValue){
        return this.fullName = newValue
    }

    getContactFullName(){
        return this.fullName;
    }

    createContactInfo(typeOfContact, valueOfContact) {
        let contactInfoCreated = new ContactInfo(typeOfContact, valueOfContact)
        this.contactInfo.push(contactInfoCreated)
        return contactInfoCreated
    }

    getAllContactInfo() {
        return this.contactInfo
    }

    findContactInfo(contactInfoId) {
        try {
        for (let index = 0; index < this.contactInfo.length; index++) {
            if (contactInfoId == this.contactInfo[index].Id) {
                return [index, true]
            }
        }
       throw new NotFound ("Contact Info is Not Found")
    } catch (error) { 
        throw (error)
    }
}
    updateContactInfo(contactInfoId, newValue) {
    try {
        if (typeof contactInfoId != "number") {
            throw new ValidationError("contact info ID invalid input")
        }
        let indexOfContactInfo = this.findContactInfo(contactInfoId)
        this.contactInfo[indexOfContactInfo].updateContactInfo(newValue)
        return this.contactInfo[indexOfContactInfo]
    } catch (error) {
        throw error
    }
}

    deleteContactInfo(contactInfoId){
        try {
            if (typeof contactInfoId != "number") {
                throw new ValidationError("contact info ID invalid input")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoId)
            this.contactInfo.splice(indexOfContactInfo, 1)
            return this.contactInfo
        } catch (error) {
            throw error   
        }
    }       

    getContactInfoById(contactInfoId){
        try {
            if (typeof contactInfoId != "number") {
                throw new ValidationError("contact info ID invalid input")
            }
            let indexOfContactInfo = this.findContactInfo(contactInfoId)
            return this.contactInfo[indexOfContactInfo]
        } catch (error) {
            throw error
        }
    }
}
module.exports = Contact
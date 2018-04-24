var chai = require('chai');
var chaiAsPromised = require("chai-as-promised");
chai.should();
chai.use(chaiAsPromised);

var nsv = require("../index");

describe("Index", function() {
    let valid_input = {
        first_name: "Jhon",
        last_name: "Don",
        email: "jhon.don@mail.com",
        birthday: "01/01/1970",
        zip_code: 40120
    };

    it("should return the provided input as output in case of success", function() {
        return nsv(valid_input).should.eventually.equal(valid_input);
    });


    it("should succeed if optional fields are not provided", function() {
        let valid_input_without_optionals = Object.assign({}, valid_input);
        delete valid_input_without_optionals.birthday;
        delete valid_input_without_optionals.zip_code;
        return nsv(valid_input_without_optionals).should.eventually.equal(valid_input_without_optionals);
    });


    it("should ignore unknown provided properties in case of success", function() {
        let input_with_unknown_peoprties = Object.assign(valid_input, {
            extra: "this is an extra property"
        });
        return nsv(input_with_unknown_peoprties).should.eventually.equal(valid_input);
    });

    it("should fail providing empty object", function() {
        nsv({}).should.be.rejected;
    });

    it("should fail providing an invalid object", function() {
        nsv(true).should.be.rejected;
        nsv(1).should.be.rejected;
    });

    it("should fail providing an invalid email", function() {
        let input_with_invalid_email = Object.assign(valid_input, {
            email: "invalid_email"
        });

        nsv(input_with_invalid_email).should.be.rejectedWith({
            'email': 'This field must be a valid email'
        })
    })

    it("should fail providing an empty first name", function() {
        let input_with_empty_first_name = Object.assign(valid_input, {
            first_name: ""
        });

        return nsv(input_with_empty_first_name).should.be.rejectedWith({
            'first_name': 'This field is required'
        })
    })

    it("should fail providing an invalid birthday format", function() {
        let input_with_invalid_birthday_format = Object.assign(valid_input, {
            birthday: "01-01-1970"
        });

        return nsv(input_with_invalid_birthday_format).should.be.rejectedWith({
            'birthday': 'This field does not match the expected format: dd/mm/yyyy'
        })
    })

    it("should fail providing other data type for zip code instead of integer", function(){
        let input_with_invalid_birthday_format = Object.assign(valid_input, {
            zip_code: "string"
        });

        return nsv(input_with_invalid_birthday_format).should.be.rejectedWith({
            'birthday': 'This field does not match the expected format'
        })
    })
});
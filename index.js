'strict';

var joi = require("joi");

const JOI_VALIDATION_OPTIONS = {
    allowUnknown: false,
    stripUnknown: true,
    abortEarly: false
};

const VALIDATION_RULES = {
    first_name: joi.string().required(),
    last_name: joi.string().required(),
    email: joi.string().email().required(),
    birthday: joi.string().regex(/^(0?[1-9]|[12][0-9]|3[01])-(0?[1-9]|1[012])-\d{4}$/),
    zip_code: joi.string().regex(/^[0-9]{5}/).optional()
}

const VALIDATION_ERROR_MESSAGES = {
    first_name: 'This field is required and must be a string',
    last_name: 'This field is required and must be a string',
    email: 'This field must be a valid email',
    birthday: 'This field must match this format dd-mm-yyyy',
    zip_code: 'This field must be a string of length 5 that contains integers from 0 to 9'
}
/**
 * Validates subscription data
 * @param {data} object
 */
module.exports = function(data){
    return new Promise((resolve, reject) => {
        if(typeof data !== 'object' || data === null) return reject(false);
        let validation = joi.validate(data, VALIDATION_RULES, JOI_VALIDATION_OPTIONS);
        if(validation.error){
            let errors = {};
            validation.error.details.forEach(detail => {
                let path = detail.path[0];
                errors[path] = VALIDATION_ERROR_MESSAGES[path];
            });
            return reject(errors);
        }
        resolve(validation.value);
    });
};
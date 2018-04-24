# Newsletter Subscription Validator

# Introduction

This is a simple module to validate the data used for the subscription to the newsletter.

# Example
```javascript
var nsv = require("newsletter-subscription-validator");

nsv({
    first_name: "Jhon",
    last_name: "Don",
    email: "jhon.don@mail.com",
    birthday: "01-01-1970",
    zip_code: "40120"
}).then(data => {
    // Success case
}).catch(error => {
    // Failure case
})
```
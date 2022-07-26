import {body}  from "express-validator";


class expressValidator {
static postBlog (){
return [
body('title','the title should be at least with four caracters')
.isLength({min:4}),
body('description','the description should of 10 characters as the minimum')
.isLength({min:10})
]
}
static postUpdate (){
return [
body('title','the title should be at least with four caracters')
.isLength({min:4}),
body('description','the description should of 10 characters as the minimum')
.isLength({min:10})
]

}
static signup () {
return [
body('firstName', 'invalid first name ',)
.trim(),
body('secondName', 'invalid second name',)
.trim(),
body('email','invalid email')
.isEmail(),
body('password', 'invalid password ').isLength({min:6})
]
}
static signin () {
return [
body('email','invalid email').isEmail(),
body('password','invalid password , the password must contain more than five characters').isLength({min:5})
]
}
static getRest () {
return [ body('email', 'invalid email !').isEmail() ]
}
}

export default expressValidator
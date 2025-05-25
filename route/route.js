const {signup,login,logout}=require('../controllers/usercontroller')
const express=require('express')
const {authenticateuser}=require('../middleware/usermids')

const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/logout', authenticateuser,logout)


module.exports=router

import express from 'express'
import { verifyUserAuth } from '../midalware/UserAuth.js'
import { createPaymentIntent } from '../controler/PaymontConroler.js'
const router=express.Router()

router.route('/payment').post(verifyUserAuth,createPaymentIntent)

export default router
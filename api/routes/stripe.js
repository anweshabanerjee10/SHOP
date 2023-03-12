const router = require('express').Router()

const KEY = process.env.STRIPE_KEY
const stripe = require('stripe')(KEY)

require('stripe')

router.post('/payment', (req, res) => {
  // stripe.charges.create(
  //   {
  //     source: req.body.tokenId,
  //     amount: req.body.amount,
  //     currency: 'usd',
  //   },

  const paymentIntent = stripe.paymentIntents.create(
    {
      amount: 2000,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    },

    // stripe.PaymentIntent.create(
    //   {
    //     source: req.body.tokenId,
    //     amount: req.body.amount,
    //     currency: 'usd',
    //     // automatic_payment_methods: { enabled: true },
    //   },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr)
      } else {
        res.status(200).json(stripeRes)
      }
    },
  )
})

module.exports = router

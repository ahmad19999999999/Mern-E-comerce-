import HandelAsyncError from '../midalware/HandelAsyncError.js';

export const createPaymentIntent = HandelAsyncError(async (req, res, next) => {
  const { amount } = req.body;

  // إنشاء client secret وهمي
  const fakeClientSecret = `pi_mock_${Math.random().toString(36).substring(2)}_secret_${Math.random().toString(36).substring(2)}`;

  // نرجع رد مثل Stripe
  res.status(200).json({
    success: true,
    paymentIntent: {
      id: `pi_mock_${Math.random().toString(36).substring(2)}`,
      amount,
      currency: 'usd',
      client_secret: fakeClientSecret,
      status: 'requires_payment_method',
    },
  });
});

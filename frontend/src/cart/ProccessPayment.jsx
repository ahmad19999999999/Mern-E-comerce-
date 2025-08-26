import React from 'react'
import '../Style/CartStyles/Payment.css'
import PageTitle from '../components/PageTitle'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CheckoutPath from './CheckoutPath'
import { Link, useNavigate } from 'react-router-dom'

const ProccessPayment = () => {
  const orderItem = JSON.parse(sessionStorage.getItem('orderItem'))
  const navigate = useNavigate()

  if (!orderItem) {
    return <p>No order found. Please add items to cart first.</p>
  }

  const handleGoToPaymentForm = () => {
    navigate('/checkout/form') // يوديك لصفحة الفورم
  }

  return (
    <>
      <PageTitle title='Payment' />
      <Navbar />
      <CheckoutPath activepath={2} />
      <div className='payment-container'>
        <Link to='/order/confirm' className='payment-go-back'>Go Back</Link>
        <button
          className='payment-btn'
          onClick={handleGoToPaymentForm}
        >
          {`أكمل عملية الدفع (${orderItem.total})`}
        </button>
      </div>
      <Footer />
    </>
  )
}

export default ProccessPayment



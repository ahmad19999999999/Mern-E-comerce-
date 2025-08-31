import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createOrder, removeError, removeAccess } from "../features/order/OrderSlice";
import { toast } from "react-toastify";
import { clearCart } from "../features/cart/Cartslice";
import "../Style/CartStyles/PaymentSuccess.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const CheckoutAftermath = () => {
  const dispatch = useDispatch();
  const { cartItem, shippinginfo } = useSelector((state) => state.cart);
  const { loading, success, error } = useSelector((state) => state.order);

  const storedData = sessionStorage.getItem('orderItem') 
    ? JSON.parse(sessionStorage.getItem('orderItem')) 
    : null;

  const orderSent = useRef(false);

  // تحويل ملف الصورة إلى Base64
  const convertFileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    const sendOrder = async () => {
      if (!orderSent.current && cartItem.length > 0 && shippinginfo && storedData) {
        // تحويل الصور للـ Base64 إذا كانت File object
        const orderItemsWithBase64 = await Promise.all(
          cartItem.map(async (item) => {
            let imageData = item.image?.url || item.image; // إذا رابط موجود مسبقاً

            // إذا كانت الصورة ملف، حولها لـ Base64
            if (item.image instanceof File) {
              imageData = await convertFileToBase64(item.image);
            }

            return {
              name: item.name,
              product: item.product || item._id,
              quantity: item.quantity,
              price: item.price,
              image: imageData,
            };
          })
        );

        const orderData = {
          orderItem: orderItemsWithBase64,
          shippingInfo: {
            phone: shippinginfo.phoneNumber,
            address: shippinginfo.address,
            city: shippinginfo.city,
            state: shippinginfo.state,
            country: shippinginfo.country,
            postalCode: shippinginfo.pinCode
          },
          paymentInfo: {
            id: 'mok_123',
            status: 'success'
          },
          Itemprice: storedData.subtotal,
          taxprice: storedData.tax,
          shippingprice: storedData.shipping,
          totaleprice: storedData.total,
          paidAt: new Date(),
          orderStatus: 'pending'
        };

        dispatch(createOrder(orderData));
        sessionStorage.removeItem('orderItem');
        orderSent.current = true;
      }
    };

    sendOrder();
  }, [dispatch, cartItem, shippinginfo, storedData]);

  useEffect(() => {
    if (error && !toast.isActive("error-toast")) {
      toast.error(error, { toastId: "error-toast", position: "top-center", autoClose: 3000 });
      dispatch(removeError());
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success && !toast.isActive("success-toast")) {
      toast.success("Order has been created successfully 🎉", { toastId: "success-toast", position: "top-center", autoClose: 2000 });
      dispatch(clearCart());
      dispatch(removeAccess());
    }
  }, [success, dispatch]);


  return (
    <>
      {loading ? (<Loader/>) : (
        <>
          <Navbar/>
          <div className="payment-success-container">
            <div className="success-content">
              <div className="success-icon">
                <div className="checkmark"></div>
              </div>
              <h1>Payment Successful!</h1>
              <p className="success-para">
                Thank you for your purchase. You can now continue browsing our site.
              </p>
              <a href="/" className="explore-btn">Explore More</a>
            </div>
          </div>
          <Footer/>
        </>
      )}
    </>
  );
};

export default CheckoutAftermath;

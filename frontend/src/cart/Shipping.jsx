import React, { useState } from 'react';
import '../Style/CartStyles/Shipping.css';
import PageTitle from '../components/PageTitle';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CheckoutPath from './CheckoutPath';
import { useDispatch, useSelector } from 'react-redux';
import { Country, State, City } from 'country-state-city';
import { saveShippingInfo } from '../features/cart/Cartslice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Shipping = () => {
  const { shippinginfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const [address, setAddress] = useState(shippinginfo.address||'');
  const [pinCode, setPinCode] = useState(shippinginfo.pinCode||'');
  const [phoneNumber, setPhoneNumber] = useState(shippinginfo.phoneNumber||'');
  const [country, setCountry] = useState(shippinginfo.country||'');
  const [state, setState] = useState(shippinginfo.state||'');
  const [city, setCity] = useState(shippinginfo.city||'');

  const shippingInfoSubmit = (e) => {
    e.preventDefault();
if(phoneNumber.length!==10){
   toast.error('Phone Number should been 10 Numbers', {
          position: 'top-center',
          autoClose: 3000,
        });
        return
}

    const shippingData = {
      address,
      pinCode,
      phoneNumber,
      country,
      state,
      city,
    };

    console.log('Shipping Data:', shippingData);

   dispatch(saveShippingInfo(shippingData))
   navigate('/order/confirm')
   
  };

  return (
    <>
      <PageTitle title="Shipping Info" />
      <Navbar />
      <CheckoutPath activepath={0} />
      <div className="shipping-form-container">
        <h1 className="shipping-form-header">Shipping Details</h1>
        <form className="shipping-form" onSubmit={shippingInfoSubmit}>
          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="address">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                placeholder="Enter Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="pinCode">Pin Code</label>
              <input
                type="number"
                id="pinCode"
                name="pinCode"
                placeholder="Enter Your Pin Code"
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
                required
              />
            </div>

            <div className="shipping-form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter Your Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="shipping-section">
            <div className="shipping-form-group">
              <label htmlFor="country">Country</label>
              <select
                name="country"
                id="country"
                value={country}
                onChange={(e) => {
                  setCountry(e.target.value);
                  setState(''); // لما يتغير البلد نفرغ الولاية والمدينة
                  setCity('');
                }}
                required
              >
                <option value="">Select your Country</option>
                {Country.getAllCountries().map((item) => (
                  <option key={item.isoCode} value={item.isoCode}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>

           {country && <div className="shipping-form-group">
              <label htmlFor="state">State</label>
              <select
                name="state"
                id="state"
                value={state}
                onChange={(e) => {
                  setState(e.target.value);
                  setCity('');
                }}
                disabled={!country}
                required
              >
                <option value="">Select your State</option>
                {country &&
                  State.getStatesOfCountry(country).map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>}

           { state && <div className="shipping-form-group">
              <label htmlFor="city">City</label>
              <select
                name="city"
                id="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                disabled={!state}
                required
              >
                <option value="">Select your City</option>
                {state &&
                  City.getCitiesOfState(country, state).map((item) => (
                    <option key={item.name} value={item.name}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>
                        }
          </div>
          

          <button className="shipping-submit-btn" type="submit">
            Continue
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Shipping;

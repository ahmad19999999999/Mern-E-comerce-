import React from 'react';
import '../style/CartStyles/CheckoutPath.css';
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';

function CheckoutPath({activepath}) {
    const path=[
       { label:'Shipping Details',
        icon:<LocalShipping />
       },
       { label:'Confirm Order',
        icon:<LibraryAddCheck />
       },
       { label:'Payment',
        icon:<AccountBalance />
       }
    ]
  return (
    <div className="checkoutPath">
      {path.map((item,index)=>
      <div className="checkoutPath-step" key={index} active={activepath===index ? 'true':'false'} completed={activepath>=index ? 'true':'false'}>
        <p className="checkoutPath-icon">
          {item.icon}
        </p>
        <p className="checkoutPath-label">{item.label}</p>
      </div>)
      }
    </div>
  );
}

export default CheckoutPath;

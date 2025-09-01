import React, { useEffect, useState } from "react";
import '../Style/AdminStyles/ReviewsList.css'
import Navbar from "../components/Navbar";
import PageTitle from "../components/PageTitle";
import Footer from "../components/Footer";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { deleteReviews, FetchAdminProduct, FetchAllReviews, removeAccess, removeError } from "../features/admin/AdminSlice";
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const ReviewsList = () => {
    const {products,loading,error,reviews,success,message}=useSelector ((state)=>state.admin)
    const[selectedProduct,setSelectedProduct]=useState(null)
    console.log(reviews)
    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(FetchAdminProduct())
        if(error){
            toast.error(error||'faild to fetch products',{position:'top-center',autoClose:3000,toastId:'producterror'})
            dispatch(removeError())
        }
    },[dispatch,error])
    // fetch reviews
    const handelreview=(productId)=>{
        setSelectedProduct(productId)
        dispatch(FetchAllReviews(productId))
        
    }

    const handeldelete=async(ProductId,reviewId)=>{
         const isConfirmed = window.confirm("Are you sure you want to delete this review?")
               if (!isConfirmed) return
          
         try {
             await dispatch(deleteReviews({ProductId,reviewId})).unwrap()
             if(success){
             toast.success("Order deleted successfully", { position:'top-center', autoClose:3000 })
            dispatch(removeAccess())
            dispatch(FetchAllReviews(ProductId))
             }
        } 
      catch (error) {
            toast.error(error.message || "Order not deleted", { position:'top-center', autoClose:3000 })
             dispatch(removeError())
                  }
        
    }
 
  return (
    <>
   {loading?(<Loader/>):( <>
    <Navbar/>
    <PageTitle title={"Reviews List"}/>
    <div className="reviews-list-container">
      <h1 className="reviews-list-title">All Products</h1>

      <table className="reviews-table">
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Product Name</th>
            <th>Product Image</th>
            <th>Number Of Reviews</th>
            <th>Action</th>
            
          </tr>
        </thead>
        <tbody>
           {products&&products.map((item,index)=>  
           <tr key={item._id}>
                <td>{index+1}</td>
                <td>{item.name}</td>
                <td><img src={item.images[0].url} alt={item.name} className="product-image" /></td>
                <td>{item.numOfReviews}</td>
                <td>
            { item.numOfReviews>0 &&(<button className="action-btn view-btn" onClick={()=>handelreview(item._id)}>Views</button>)}
                </td>
            </tr>) 
    }
         
        </tbody>
      </table>

      {selectedProduct && reviews && reviews.length>0 && (<div className="reviews-details">
        <h2>Review For Product</h2>
        <table className="reviews-table">
            <thead>
                <tr>
                    <th>Sl No</th>
                    <th>Reviewer Name</th>
                    <th>Rating</th>
                    <th>Comment</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
               {reviews.map((item,index)=> 
               <tr key={item._id}>
                    <td>{index+1}</td>
                    <td>{item.name}</td>
                    <td>{item.rating}</td>
                    <td>{item.comment}</td>
                    <td> 
                        <button className="action-btn delete-btn" onClick={()=>handeldelete(selectedProduct,item._id)}><Delete/></button>
                    </td>
                </tr>)
              }
            </tbody>

        </table>
      </div>)}
    </div>
    <Footer/>
    </>)}

    </>
  );
};

export default ReviewsList;

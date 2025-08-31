import Order from "../model/Ordermodel.js";
import Product from "../model/modelproduct.js"
import User from "../model/usermodel.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import HandelAsyncError from "../midalware/HandelAsyncError.js";
import cloudinary from '../utils/CloudinaryConfig.js'

export const CreatOrder = HandelAsyncError(async (req, res, next) => {
  const {
    orderItem,
    shippingInfo,
    paymentInfo,
    Itemprice,
    taxprice,
    shippingprice,
    totaleprice
  } = req.body;

  // رفع الصور على كلاودينري لكل عنصر
  const uploadedItems = await Promise.all(
    orderItem.map(async (item) => {
      let imageUrl = item.image;

      // إذا الصورة Base64 نرفعها على كلاودينري
      if (item.image && item.image.startsWith("data:image")) {
        const uploadRes = await cloudinary.uploader.upload(item.image, {
          folder: "orders", // تقدر تغير اسم الفولدر حسب رغبتك
        });
        imageUrl = uploadRes.secure_url;
      }

      return {
        ...item,
        image: imageUrl,
      };
    })
  );

  const order = await Order.create({
    orderItem: uploadedItems,
    shippingInfo,
    paymentInfo,
    Itemprice,
    taxprice,
    shippingprice,
    totaleprice,
    paidAt: Date.now(),
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    order,
  });
});



export const GetSingleOrder=HandelAsyncError(async(req,res,next)=>{
    const order=await Order.findById(req.params.id).populate("user","name email")
    if(!order){
        return next(new ErrorHandler(404,"the order not found"))
    }
    
    res.status(200).json({
        success:true,
        order
        
    })
})

export const GetMyOrder=HandelAsyncError(async(req,res,next)=>{
    const orders=await Order.find({user:req.user._id})
    if(!orders){
        return next(new ErrorHandler(404,"the order not found"))
    } 
    res.status(200).json({
        success:true,
        orders
        
    })
})

export const GetAllOrder=HandelAsyncError(async(req,res,next)=>{
     const orders = await Order.find();

  let totalAmount = 0;
  orders.forEach(order => {
    totalAmount += order.totaleprice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    orders
  });
})

export const UpdateStatusOrder = HandelAsyncError(async (req, res, next) => {
  const { orderStatus } = req.body;

  if (!orderStatus) {
    return next(new ErrorHandler(400, "Please enter a status for updating..."));
  }

  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler(404, "The order was not found"));
  }

  if (order.orderStatus === "delivered") {
    return next(new ErrorHandler(400, "This order has already been delivered"));
  }

  // تحديث حالة الطلب
  order.orderStatus = orderStatus;

  // إذا الحالة أصبحت delivered، سجل وقت التسليم
  if (orderStatus === "delivered") {
    order.deliveredAt = Date.now();
  }

 // إذا تم شحن الطلب لأول مرة، قلل المخزون
if (orderStatus === "shipped") {
  for (const item of order.orderItem) {
    // تحقق أن item.product هو ObjectId أو String صالح
    const product = await Product.findById(item.product);

    if (!product) {
      return next(
        new ErrorHandler(404, `Product not found for ID: ${item.product}`)
      );
    }

    // التأكد أن الكمية متوفرة
    if (product.stock < item.quantity) {
      return next(
        new ErrorHandler(400, `Insufficient stock for product: ${product.name}`)
      );
    }

    // خصم الكمية من المخزون
    product.stock -= item.quantity;

    await product.save({ validateBeforeSave: false }); // حفظ التعديلات في المنتج
  }
}
  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
});

export const DeleteOrder = HandelAsyncError(async (req, res, next) => {
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler(404, "The order not found"));
    }

    if (order.orderStatus !== "Delivered") {
        return next(new ErrorHandler(401, "This order is under processing and cannot be deleted"));
    }

    // الحذف الآمن باستخدام findByIdAndDelete
    await Order.findByIdAndDelete(order._id);

    res.status(200).json({
        success: true,
        message: "Order deleted successfully"
    });
});



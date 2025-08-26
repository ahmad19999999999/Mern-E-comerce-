import Product from "../model/modelproduct.js";
import ErrorHandler from '../utils/ErrorHandler.js';
import HandelAsyncError from "../midalware/HandelAsyncError.js";
import apiFunctionality from "../utils/apiFunctionality.js";
import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_KEY_SECRET,
});
export const createProduct = HandelAsyncError(async (req, res, next) => {
  req.body.user = req.user.id;

  let images = [];

  // إذا الصور جايه من body كـ array of base64 أو URLs مؤقتة
  if (req.body.images && req.body.images.length > 0) {
    for (let img of req.body.images) {
      // img ممكن تكون base64 string أو temporary URL
    const result = await cloudinary.uploader.upload(img, { folder: 'products' });

      images.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }
  }

  req.body.images = images;

  const product = await Product.create(req.body);

  res.status(201).json({
    message: 'Product is created',
    product,
  });
});

export const getAllProducts = HandelAsyncError(async (req, res, next) => {
  const resultPerPage = 3; // عدد المنتجات لكل صفحة

  // إنشاء كائن API Features (البحث + الفلترة)
  const apiFeatures = new apiFunctionality(Product.find(), req.query)
    .search()
    .filter();


  // حساب العدد الكلي قبل تطبيق الباجيناشن
  const filterQuery = apiFeatures.query.clone();
  const productcount = await filterQuery.countDocuments();

  // حساب الصفحات الكلية
  const totalPages = Math.ceil(productcount / resultPerPage);
  const page=Number(req.query.page)||1
  if(page>totalPages&&productcount>0){
    return next(new ErrorHandler(400,"this page not found"))
  }

  // تطبيق الباجيناشن
  apiFeatures.pagination(resultPerPage);

  // تنفيذ الاستعلام
  const products = await apiFeatures.query;

  if (!products || products.length === 0) {
    return next(new ErrorHandler(400,"no product found"))
  }

  res.status(200).json({
    succuss:true,
    products,
    productcount,      // العدد الكلي للمنتجات
    totalPages,  
    resultPerPage,      // العدد الكلي للصفحات
    currentPage:page, // الصفحة الحالية
   
  });
});


export const updateProduct = HandelAsyncError(async (req, res, next) => {
  let product = await Product.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  let images = [];

  // التعامل مع الصورة الواحدة أو أكثر
  let imageArray = [];
  if (typeof req.body.images === "string") {
    imageArray.push(req.body.images);
  } else if (Array.isArray(req.body.images)) {
    imageArray = req.body.images;
  }

  if (imageArray.length > 0) {
    // حذف الصور القديمة من Cloudinary
    if (product.images && product.images.length > 0) {
      for (let img of product.images) {
        if (img.public_id) {
          await cloudinary.uploader.destroy(img.public_id);
        }
      }
    }

    // رفع الصور الجديدة
    for (let img of imageArray) {
      if (img && img.startsWith("data:image")) {
        const result = await cloudinary.uploader.upload(img, {
          folder: "products",
          width: 800,
          crop: "scale",
        });
        images.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    }

    req.body.images = images;
  }

  // تحديث بيانات المنتج
  product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

  res.status(200).json({ message: "Product updated successfully", product });
});


export const deleteProduct = HandelAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler(404, "Product not found"));
  }

  // حذف الصور من Cloudinary
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }

  // حذف المنتج من الداتابيز
  await product.deleteOne();

  res.status(200).json({ message: "Product is deleted" }, product._id );
});


export const findOneProduct =HandelAsyncError( async (req, res,next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
   return next(new ErrorHandler(404,"product not found"));
  }
  res.status(200).json({ message: "Product found", product });
});

//get all products for admin
export const getAdminProducts=HandelAsyncError(async(req,res,next)=>{
    const products=await Product.find()
    res.status(200).json({
      succuss:true,
      products
    })
})

export const CreateRevwieProduct = HandelAsyncError(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment
  };

  const product = await Product.findById(productId);

  const reviewExist = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (!reviewExist) {
    product.reviews.push(review);
  } else {
    product.reviews.forEach((r) => {
      if (r.user.toString() === req.user._id.toString()) {
        r.rating = Number(rating);
        r.comment = comment;
      }
    });
  }

  // تحديث عدد التقييمات دائما بعد التعديل أو الإضافة
  product.numOfReviews = product.reviews.length;

  // يمكن تحديث التقييم العام هنا أيضا إن أردت
  product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    product
  });
});

export const GetProductsRevwie = HandelAsyncError(async (req, res, next) => {
  const product=await Product.findById(req.query.id)
  if(!product){
    return next(new ErrorHandler(400,`the product with id: ${req.query.id} is not found`))
  }
  res.status(200).json({
    success:true,
    reviews:product.reviews
  })

 
});

export const DeleteProductsReview = HandelAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler(400, `The product with ID: ${req.query.id} is not found`));
  }

  const reviewId = req.query.reviewId;

  if (!reviewId) {
    return next(new ErrorHandler(400, "Review ID is required to delete the review."));
  }

  // تحقق من وجود المراجعة حسب reviewId
  const reviewExist = product.reviews.find(
    (review) => review._id.toString() === reviewId.toString()
  );

  if (!reviewExist) {
    return next(new ErrorHandler(404, "Review with this ID was not found."));
  }

  // حذف المراجعة من المصفوفة
  product.reviews = product.reviews.filter(
    (review) => review._id.toString() !== reviewId.toString()
  );

  // تحديث عدد المراجعات
  product.numOfReviews = product.reviews.length;

  // تحديث متوسط التقييم
  if (product.reviews.length === 0) {
    product.ratings = 0;
  } else {
    product.ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
  }

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "Review deleted successfully.",
    product,
  });
});



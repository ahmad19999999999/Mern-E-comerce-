import React, { useState } from "react";
import { Container, Paper, Typography, TextField, Grid, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const CheckoutForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ تحقق بسيط
    if (!formData.fullName || !formData.address || !formData.cardNumber || !formData.expiry || !formData.cvv) {
      alert("الرجاء ملء جميع الحقول");
      return;
    }
    if (formData.cardNumber.length < 16) {
      alert("رقم البطاقة يجب أن يكون 16 رقمًا");
      return;
    }
    if (formData.cvv.length < 3) {
      alert("رمز CVV غير صحيح");
      return;
    }

    // هنا ممكن تربط API دفع حقيقي (Stripe أو PayPal مثلاً)
    console.log("Form submitted:", formData);

    // بعد الدفع الناجح روح لصفحة الشكر
    navigate("/after/chekout");
  };

  return (
    <>
    <Navbar/>
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Typography variant="h5" gutterBottom>
          Payment Information
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="address"
                label="Address"
                value={formData.address}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="cardNumber"
                label="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="expiry"
                label="Expiry Date (MM/YY)"
                value={formData.expiry}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                required
                fullWidth
                name="cvv"
                label="CVV"
                type="password"
                value={formData.cvv}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          {/* زر مخصص بنفسجي فاتح */}
          <Button
            type="submit"
            fullWidth
            sx={{
              mt: 4,
              backgroundColor: "#9c27b0",
              color: "#fff",
              borderRadius: "12px",
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": { backgroundColor: "#7b1fa2" },
            }}
          >
            Pay Now
          </Button>
        </form>
      </Paper>
    </Container>
    <Footer/>
    </>
  );
};

export default CheckoutForm;


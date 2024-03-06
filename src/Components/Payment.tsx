import { useCallback } from "react";
import useRazorpay from "react-razorpay";
import logo from "../Assets/Razorpay-Startup-Story.jpg";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../App/Store";
import { handle, RemoveAll } from "../Features/Products/ProductsSlice";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Payment() {
  const navigate = useNavigate();
  const { cart } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();
  const [Razorpay] = useRazorpay();

  //  dicount price
  let total: any = cart.reduce((acc, val) => {
    return acc + val.price * val.qty;
  }, 0);

  let Discount: number = (total / 100) * 25;
  let Total = Math.round(total - Discount);
  

  const handlePayment = useCallback(() => {
    const options = {
      key: "rzp_test_Sb2X13ja9SNuMt",
      amount: `${Total * 100}`,
      currency: "INR",
      name: "RazorPay",
      description: "Test Transaction",
      image: logo,
      order_id: "",
        handler: (res: any) => {
        dispatch(() => handle(res.razorpay_payment_id));
        dispatch(RemoveAll());
        (function () {
          toast.success("Wow Item added Into Cart!");
        })();
        navigate("/");
      },
      prefill: {
        name: "Piyush Garg",
        email: "youremail@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzpay = new Razorpay(options);
    rzpay.on("payment.failed", function (response: any) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzpay.on("payment.success", function (response: any) {
      console.log(response);
    });

    rzpay.open();
  }, [Razorpay]);

  return (
    <div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Box onClick={handlePayment}>Proceed to Payment</Box>
    </div>
  );
}

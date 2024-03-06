import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../App/Store";
import { AddCart, fetchData, Increment, Decrement } from "./ProductsSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { StyleSheet } from "./Styles";
import Rating from "@mui/material/Rating";
import { CircularProgress } from "@mui/material";
import addNotification, { Notifications } from "react-push-notification";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Products = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, cart, isAdded, isLoading } = useSelector(
    (state: RootState) => state.products
  );

  console.time();

  const notify = () => toast.success("Wow Item added Into Cart!");

  const successNotification = () => {
    addNotification({
      title: "success",
      icon: "⛑️",
      subtitle: "Product Added Successfully!!",
      theme: "light",
      closeButton: "close",
      backgroundTop: "skyblue",
      backgroundBottom: "skyblue",
    });
  };

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleAddCart = (product: object) => {
    dispatch(AddCart({ ...product, qty: 1 }));
    successNotification();
    notify();
  };
  const handleInc = (id: number) => {
    dispatch(Increment(id));
  };

  const handleDec = (id: number) => {
    dispatch(Decrement(id));
  };

  return (
    <div>
      {/* <Notifications/> */}
      <ToastContainer
        position="top-right"
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

      {isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <CircularProgress />
        </Box>
      )}
      {products && (
        <Grid container sx={{ padding: "25px" }} spacing={5}>
          {products?.map((product, index) => (
            <Grid container key={index} item xs={12} sm={6} md={4} lg={4}>
              <Card sx={StyleSheet.Card}>
                <Box
                  component={"img"}
                  src={product.images[0]}
                  sx={{ margin: "20px", width: "180px" }}
                ></Box>

                <Box sx={{ fontWeight: "600", padding: "10px" }}>
                  {product.title}
                </Box>

                <Box sx={{ fontSize: "15px" }}>{product.description}</Box>

                <Box sx={{ fontSize: "15px", padding: "10px", color: "grey" }}>
                  <Box component={"strong"} color={"black"} fontSize={"18px"}>
                    ₹{product.price}{" "}
                  </Box>
                  &nbsp;{" "}
                  <Box component={"span"} sx={{ color: "green" }}>
                    {" "}
                    -{Math.round(product.discountPercentage)}% off{" "}
                  </Box>
                </Box>

                {/* Rating */}

                <Box>
                  <Rating
                    name="read-only"
                    value={product.rating}
                    sx={{ color: "#388e3c" }}
                    readOnly
                  />
                </Box>

                <Box sx={StyleSheet.btnGrp}>
                  {cart.find((ob) => ob.id === product.id) && isAdded ? (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mt: "20px",
                        justifyContent: "space-around",
                      }}
                    >
                      {cart.find(
                        (ob) => ob.id === product.id && ob.qty === 1
                      ) ? (
                        <Button
                          variant="outlined"
                          onClick={() => handleDec(product.id)}
                          sx={{ fontWeight: "900" }}
                          disabled
                        >
                          -
                        </Button>
                      ) : (
                        <Button
                          variant="outlined"
                          onClick={() => handleDec(product.id)}
                          sx={{ fontWeight: 600 }}
                        >
                          -
                        </Button>
                      )}

                      <Box sx={{ ml: "8px", mr: "8px", fontWeight: 600 }}>
                        {cart.map((obj) => {
                          if (obj.id === product.id) {
                            return obj.qty;
                          }
                        })}
                      </Box>
                      <Button
                        variant="outlined"
                        onClick={() => handleInc(product.id)}
                        sx={{ fontWeight: "500" }}
                      >
                        +
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant={"contained"}
                      sx={StyleSheet.button}
                      onClick={() => handleAddCart(product)}
                    >
                      AddCart
                    </Button>
                  )}
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};

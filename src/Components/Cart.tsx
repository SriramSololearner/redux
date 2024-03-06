import {
  Box,
  Button,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import { StyleSheet } from "./styles";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../App/Store";
import cCart from "../Assets/cart.webp";
import { RemoveFromCart } from "../Features/Products/ProductsSlice";
import Payment from "./Payment";
import { useState } from "react";
import addNotification, { Notifications } from "react-push-notification";

const ShoppingCart = () => {
  const [toggle, setToggle] = useState(false);
  const [checked, setChecked] = useState(false);
  const navigator = useNavigate();
  const { cart, OrderId } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const warningNotification = () => {
    addNotification({
      title: "Warning",
      message: "Product Removed from Cart!!",
      theme: "red",
      closeButton: "X",
    });
  };

  const RemoveProduct = (id: number) => {
    dispatch(RemoveFromCart(id));
    warningNotification();
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  //  dicount price
  let total: any = cart.reduce((acc, val) => {
    return acc + val.price * val.qty;
  }, 0);

  let Discount: number = (total / 100) * 25;
  let DeliveryCharges: number = (total / 100) * 10;
  let Total = Math.round(total - Discount);

  return (
    <Box sx={StyleSheet.MainContainer}>
      {/* Cart Items */}
      <Notifications />

      <Container sx={StyleSheet.CartContainer}>
        {cart.length === 0 ? (
          /* Cart Items Empty */

          <Box sx={StyleSheet.CartEmpty}>
            <Box
              component={"img"}
              src={cCart}
              sx={StyleSheet.CartImg}
              alt="cart"
            />
            <Box>Missing Cart items?</Box>
            <Box sx={StyleSheet.LogTxt}>Please Add New Items</Box>
            <Box
              component={"button"}
              sx={StyleSheet.logBtn}
              onClick={() => navigator("/")}
            >
              Back
            </Box>
          </Box>
        ) : (
          <>
            {!toggle ? (
              <Box>
                {/* Cart List */}
                {cart.map((product, ind) => (
                  <Grid
                    container
                    spacing={8}
                    key={ind}
                    mt={1}
                    mb={4}
                    color={"grey[0]"}
                  >
                    <Grid item xs={12} sm={8} lg={4} xl={5}>
                      <Box
                        component={"img"}
                        src={product.thumbnail}
                        alt="Product"
                        sx={{ width: "240px", height: "150px" }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mt: "20px",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Box>Price ₹{product.price}</Box>
                        <Box fontSize="15px" ml="90px">
                          {" "}
                          Quantity:
                          {cart.map((obj) => {
                            if (obj.id === product.id) {
                              return obj.qty;
                            }
                          })}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={3} lg={6}>
                      <Box
                        sx={{
                          ":hover": { color: "#3b6bff", cursor: "pointer" },
                        }}
                      >
                        {" "}
                        {product.description}
                      </Box>
                      <Box fontWeight={900} mt={"10px"}>
                        Price ₹{product.price * product.qty}
                      </Box>
                      <Button
                        variant="text"
                        sx={{
                          mt: "15px",
                          "&:hover": {
                            boxShadow: "inset 0 0 100px 0px #578cc9",
                            transition: "1.5s ease",
                            color: "white",
                          },
                        }}
                        onClick={() => RemoveProduct(product.id)}
                      >
                        Remove
                      </Button>
                    </Grid>
                  </Grid>
                ))}
                <Button
                  sx={{ mt: "20px", mb: "20px", float: "right" }}
                  variant="contained"
                  onClick={handleToggle}
                >
                  Placeorder
                </Button>
              </Box>
            ) : (
              <Box>
                <h2 className="text-3xl font-bold">Address</h2>
                <Box
                  component={"input"}
                  type="radio"
                  checked={checked}
                  onClick={() => setChecked(!checked)}
                />
                <Box
                  component={"span"}
                  className="mt-5 text-lg leading-7 text-gray-500 dark:text-gray-400
                        sm:leading-9 sm:truncate"
                >
                  Our office is located in the heart of downtown Los Angeles,
                  California. 186, Bldg. A, Sector 16, Uttar Badda, Dhaka - 1
                  <br />
                </Box>
                <Button
                  sx={{ mt: "20px", mb: "20px" }}
                  disabled={!checked}
                  variant="contained"
                >
                  <Payment />
                </Button>
              </Box>
            )}
          </>
        )}
      </Container>

      {/* Checkout Container */}

      {cart.length !== 0 && (
        <Container
          sx={{
            width: "40%",
            height: "100%",
            bgcolor: "#ffffff",
            position: "sticky",
            top: "80px",
            mt: "10px",
            ml: "30px",
            mr: "30px",
            mb: "10px",
          }}
        >
          <Grid container spacing={1}>
            <Grid item xs={20} sm={12} lg={12}>
              <Box sx={{ padding: "5px" }}>
                <Box
                  sx={{
                    color: "grey",
                    pb: "10px",
                    pt: "5px",
                    fontSize: "17px",
                  }}
                >
                  PRICE DETAILS
                </Box>
                <Divider component={"header"} />
                <Box sx={StyleSheet.ChecoutItems}>
                  <Box>Price({cart.length} items)</Box> ₹{total}
                </Box>
                <Box sx={StyleSheet.ChecoutItems}>
                  {" "}
                  <Box>Discount </Box>{" "}
                  <Box color={"green"}> - ₹{Discount.toFixed(0)} </Box>
                </Box>
                <Box sx={StyleSheet.ChecoutItems}>
                  {" "}
                  <Box>Delivery Charges</Box>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      sx={{ textDecoration: "line-through", color: "grey" }}
                    >{`₹${DeliveryCharges.toFixed(0)}`}</Typography>
                    <Box sx={{ color: "green", ml: "10px" }}>Free</Box>
                  </Box>
                </Box>
                <Divider component={"hr"} />
                <Box sx={StyleSheet.ChecoutItemsTotal}>
                  {" "}
                  <Box> Total Amount</Box> <Box> ₹{Total.toFixed(0)}</Box>
                </Box>
                <Divider component={"hr"} />
                <Box color={"green"} sx={{ pt: "10px", pb: "10px" }}>
                  You will save ₹{Discount.toFixed(0)} on this order
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      )}
    </Box>
  );
};

export default ShoppingCart;

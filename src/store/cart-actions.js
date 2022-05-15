import { uiSliceActions } from "./ui-slice";
import { cartSliceActions } from "./cart-slice";

export const fetchCartData = () => {
  return async (dispatch) => {
    const fetchCartData = async () => {
      const response = await fetch(
        "https://react-redux-303c7-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) throw new Error("Cart data could not be fetched.");

      const data = response.json();

      return data;
    };

    try {
      const cartData = await fetchCartData();

      dispatch(
        cartSliceActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiSliceActions.showNotification({
          title: "Error",
          message: "Sending cart data failed.",
          status: "error",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    dispatch(
      uiSliceActions.showNotification({
        title: "Pending",
        message: "Sending data...",
        status: "pending",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        "https://react-redux-303c7-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        dispatch(
          uiSliceActions.showNotification({
            title: "Error",
            message: "Sending cart data failed.",
            status: "error",
          })
        );
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiSliceActions.showNotification({
          title: "Success",
          message: "Success sending data.",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        uiSliceActions.showNotification({
          title: "Error",
          message: "Sending cart data failed.",
          status: "error",
        })
      );
    }
  };
};

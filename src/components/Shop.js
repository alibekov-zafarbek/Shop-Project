import React, { useState, useEffect } from "react";
import Loader from "./Loader";
import { API_KEY, API_URL } from "../config";
import GoodList from "./GoodList";
import Cart from "./Cart";
import BasketList from "./BasketList";

export default function Shop() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setGoods(data.featured && data.featured);
      });
    setLoading(false);
  }, []);
  const addToBasket = (item) => {
    const itemIndex = order.findIndex((orderItem) => orderItem.id === item.id);
    if (itemIndex < 0) {
      const newItem = {
        ...item,
        quantity: 1,
      };
      setOrder([...order, newItem]);
    } else {
      const newOrder = order.map((orderItem, index) => {
        if (index === itemIndex) {
          return {
            ...orderItem,
            quantity: orderItem.quantity + 1,
          };
        } else {
          return orderItem;
        }
      });
      setOrder(newOrder);
    }
  };
  const handleBasketShow = () => {
    setBasketShow(!isBasketShow);
  };
  const removeFromBasket = (itemID) => {
    const newOrder = order.filter((item) => item.id !== itemID);
    console.log(newOrder);
    setOrder(newOrder);

  };
  const incrementQuantity = (itemID) => {
    const newOrder = order.map((el) => {
      if (el.id === itemID) {
        const newQuantity = el.quantity + 1;
        return {
          ...el,
          quantity: newQuantity,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };
  const decrementQuantity = (itemID) => {
    const newOrder = order.map((el) => {
      if (el.id === itemID) {
        const newQuantity = el.quantity - 1;
        return {
          ...el,
          quantity: newQuantity >= 0 ? newQuantity : 0,
        };
      } else {
        return el;
      }
    });
    setOrder(newOrder);
  };

  return (
    <div className="content">
      <Cart quantity={order.length} handleBasketShow={handleBasketShow} />
      {loading ? <Loader /> : <GoodList quantity={addToBasket} goods={goods} />}
      {isBasketShow && (
        <BasketList
          order={order}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          removeFromBasket={removeFromBasket}
          handleBasketShow={handleBasketShow}
        />
      )}
    </div>
  );
}

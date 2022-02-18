import React, { useEffect, useContext } from "react";
import { ShopContext } from "../context";
import Loader from "./Loader";
import { API_KEY, API_URL } from "../config";
import GoodList from "./GoodList";
import Cart from "./Cart";
import BasketList from "./BasketList";

export default function Shop() {
  const { setGoods, loading, isBasketShow } = useContext(ShopContext);

  useEffect(() => {
    fetch(API_URL, {
      headers: {
        Authorization: API_KEY,
      },
    })
      .then((res) => res.json())
      .then((data) => setGoods(data.featured));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="content">
      <Cart />
      {loading ? <Loader /> : <GoodList />}
      {isBasketShow && <BasketList />}
    </div>
  );
}

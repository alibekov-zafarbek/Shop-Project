import React from "react";
import BasketItem from "./BasketItem";

export default function BasketList({
  order,
  handleBasketShow,
  removeFromBasket,
  decrementQuantity,
  incrementQuantity
}) {
  const totalPrice = order.reduce((sum, el) => {
    return sum + el.price * el.quantity;
  }, 0);
  return (
    <ul className="collection basket-list">
      <li className="collection-item active">Basket</li>
      {order.length ? (
        order.map((item) => {
          return (
            <BasketItem
              removeFromBasket={removeFromBasket}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
              key={item.id}
              {...item}
            />
          );
        })
      ) : (
        <li className="collection-item">Basket is empty </li>
      )}
      <li className="collection-item active">
        Total Price :{totalPrice}
        <b>$</b>
      </li>
      <i
        className="material-icons basket-close"
        onClick={() => handleBasketShow()}
      >
        close
      </i>
    </ul>
  );
}

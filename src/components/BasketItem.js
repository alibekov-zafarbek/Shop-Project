import React from "react";

export default function BasketItem({
  id,
  name,
  price,
  quantity,
  removeFromBasket,
  incrementQuantity,
  decrementQuantity,
}) {
  return (
    <div className="bsk">
      <li className="collection-item">
        {name} x{quantity} = {price * quantity}
        <b>$</b>
        <span className="secondary-content">
          <a
            href="#!"
            onClick={() => incrementQuantity(id)}
            className="waves-effect waves-light btn btnq"
          >
            <i  className="material-icons left">
              exposure_plus_1
            </i>
          </a>
          <a
            href="#!"
            onClick={() => decrementQuantity(id)}
            className="waves-effect waves-light btn btnq"
            style={{ marginLeft: " 10px" }}
          >
            <i className="material-icons left">exposure_minus_1</i>
          </a>
          <a
            href="#!"
            className="waves-effect waves-light btn btnq"
            style={{ margin: "0 10px" }}
            onClick={() => removeFromBasket(id)}
          >
            <i className="material-icons basket-delete">delete_forever</i>
            delete
          </a>
        </span>
      </li>
    </div>
  );
}

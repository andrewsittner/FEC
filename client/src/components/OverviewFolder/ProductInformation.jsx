import React, {useState} from 'react';

import Dropdown from './Dropdown.jsx';
import Style from './Style.jsx';
import QDropdown from './QDropdown.jsx'

import "./OverviewCss/productInformation.css";
import "./OverviewCss/dropdown.css";

const ProductInformation = ({item, itemStyle, allStyleResult, setItemStyle, setMainPhoto, check, setCheck}) => {

  const [sizeSelector, setSizeSelector] = useState('Select Size');
  const [quantity, setQuantitySelector] = useState(1);
  const [displayErr, setDisplayErr] = useState(false);

  let size = [];
  let quantityObj = {};
  let cart = [];

  Object.keys(itemStyle.skus).map(styleId => {
    return itemStyle.skus[styleId]
  }).forEach(item => {
    if (item.quantity > 0) {
      size.push(item.size);
      quantityObj[item.size] = item.quantity
    }
  })

  const addCart = () => {
    if(sizeSelector === 'Select Size') {
      setDisplayErr(!displayErr)
      setTimeout(() => {setDisplayErr(displayErr)}, 1000);
      // console.log(!displayErr)
      // setTimeout(() => {console.log(displayErr)}, 1000);
    } else {
      let curCart = {};
      curCart.Name = item.name;
      curCart.Style = itemStyle.name;
      curCart.Price = itemStyle.sale_price || itemStyle.original_price;
      curCart.size = sizeSelector;
      curCart.Quantity = quantity;
      cart.push(curCart);
      console.log(curCart);
    }
  }

  return (
      <div id="productInformation">
        <div> &#9733;&#9733;&#9733;&#9734;&#9734; Read all [#] reviews</div>
        <div id="category">{item.category}</div>
        <h1 id="itemName">{item.name}</h1>
        {itemStyle.sale_price ?
        <div id="itemPrice">
          <p><s>${itemStyle.original_price}</s></p> &nbsp;
          <p style={{color: 'red'}}>${itemStyle.sale_price}</p>
        </div> : <div id="itemPrice">${itemStyle.original_price}</div>}
        <div><strong>STYLE &gt; </strong>{itemStyle.name}</div>
        <Style allStyleResult={allStyleResult} setItemStyle={setItemStyle} setMainPhoto={setMainPhoto} check={check} setCheck={setCheck}/>
        {displayErr ? <p>Please select a size</p> : null}
        <div id="sizeDropdown">
          <Dropdown placeHolder={sizeSelector} sizeOption={size} setSizeSelector={setSizeSelector}/>
          <QDropdown option={quantityObj} sizeSelector={sizeSelector} setQuantitySelector={setQuantitySelector} quantity={quantity}/>
        </div>
        <div className="checkout">
        {size.length > 0 ? <button onClick={addCart}>Add To Bag</button> : null}
        <button onClick={() => {console.log(cart)}}>Show Cart</button>
        </div>
      </div>
  );
};

export default ProductInformation;
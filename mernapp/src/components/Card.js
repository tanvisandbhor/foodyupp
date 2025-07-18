import React, { useRef, useState, useEffect } from "react";
import { useCart, useDispatchCart } from "./ContextReducer";


const Card = (props) => {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [qty, setqty] = useState(1);
    const [Size, setSize] = useState("");

    let finalPrice = qty * parseInt(options[Size]);

    const handleAddToCart = async () => {
        let food = {};
        for (const item of data) {
            if (item.id === props.FoodItem._id) {
                food = item;
                break;
            }
        }

        if (Object.keys(food).length !== 0) {
            if (food.size === Size) {
                await dispatch({
                    type: "UPDATE",
                    id: props.FoodItem._id,
                    price: finalPrice,
                    qty: qty,
                    Size: Size
                });
                return;
            } else {
                await dispatch({
                    type: "ADD",
                    id: props.FoodItem._id,
                    name: props.FoodItem.name,
                    price: finalPrice,
                    qty: qty,
                    Size: Size
                });
                return;
            }
        }console.log("Order created or updated successfully");
     



        await dispatch({
            type: "ADD",
            id: props.FoodItem._id,
            name: props.FoodItem.name,
            price: finalPrice,
            qty: qty,
            Size: Size
        });



    };

    useEffect(() => {
        setSize(priceRef.current.value);
    }, []);

    return (
        <div>
            <div>
                <div
                    className="card mt-3"
                    style={{ width: "18rem", maxHeight: "350px" }}
                >
                    <img
                        src={props.FoodItem.img}
                        className="card-img-top"
                        alt="..."
                        style={{ height: "150px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{props.FoodItem.name}</h5>

                        <div className="container w-100">
                            <select
                                className="ms-2 h-100 fs-5 bg-success rounded"
                                onChange={(e) => setqty(e.target.value)}
                            >
                                {Array.from(Array(6), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}>
                                            {i + 1}
                                        </option>
                                    );
                                })}
                            </select>

                            <select
                                className="ms-2 h-100 fs-5 bg-success rounded"
                                ref={priceRef}
                                onChange={(e) => setSize(e.target.value)}
                            >
                                {priceOptions.map((data) => {
                                    return (
                                        <option key={data} value={data}>
                                            {data}
                                        </option>
                                    );
                                })}
                            </select>

                            <div className="d-inline h-100 fs-5 m-2">
                                ₹{finalPrice}/-
                            </div>
                            <hr></hr>

                            <button
                                className="btn btn-success justify-center ms-2"
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;



import React, { useState } from "react";
import Card from "../../component/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import styles from "./checkoutDetails.module.scss";
import { useDispatch } from "react-redux";
import {
  SAVE_SHIPPING_ADDRESSS, CheckoutState, initialState
} from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";

const CheckoutDetails : Function = () => {
    
    
    const [shippingAddress, setShippingAddress] = useState<CheckoutState>({...initialState});
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

    const handleShipping = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingAddress({
            ...shippingAddress,
            [name] : value,
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(SAVE_SHIPPING_ADDRESSS(shippingAddress));
        navigate("/checkout");
    };

    return(
        <section>
            <div className={`container ${styles.checkout}`}>
                <h2>Checkout Details</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <Card cardClass={styles.card}>
                            <h3>Shipping Address</h3>
                            <label>Recipent Name:</label>
                            <input 
                                type="text"
                                placeholder="Recipient name"
                                required
                                name="name"
                                value={shippingAddress?.shippingAddress?.name}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Address line 1:</label>
                            <input 
                                type="text"
                                placeholder="Address line 1"
                                required
                                name="line1"
                                value={shippingAddress?.shippingAddress?.line1}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label> Address line 2</label>
                            <input 
                                type="text"
                                placeholder="Address line 2"
                                required
                                name="line2"
                                value={shippingAddress?.shippingAddress?.line2}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>City</label>
                            <input 
                                type="text" 
                                placeholder="City"
                                required
                                name="city"
                                value={shippingAddress?.shippingAddress?.city}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>State</label>
                            <input 
                                type="text"
                                placeholder="state"
                                required
                                name="state"
                                value={shippingAddress?.shippingAddress?.state}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Postal Code</label>
                            <input 
                                type="number"
                                placeholder="Postal code"
                                required
                                name="postal-code"
                                value={shippingAddress?.shippingAddress?.postal_code}
                                onChange={(e) => handleShipping(e)}
                            />
                            <label>Select Country</label>
                            <CountryDropdown
                                className={styles.select}
                                valueType="short"
                                value={shippingAddress?.shippingAddress?.country}
                                onChange={(val : string) => 
                                    handleShipping({
                                        target: { name: "country", value : val} ,
                                    })
                                }
                            />
                            <label>Phone:</label>
                            <input
                                type="number"
                                placeholder="Phone"
                                required
                                name="phone"
                                value={shippingAddress?.shippingAddress?.phone}
                                onChange={(e) => handleShipping(e)}
                            />

                            <button type="submit" className="--btn --btn-primary --btn-block">
                                View order & checkout
                            </button>
                        </Card>
                        <br/>
                        <br/>
                    </div>
                </form>
            </div>
        </section>
    )
}


export default CheckoutDetails;
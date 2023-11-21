import { useState } from "react";
import Card from "../../component/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import styles from "./checkoutDetails.module.scss";
import { useDispatch } from "react-redux";
import {
  SAVE_SHIPPING_ADDRESSS, CheckoutState, initialState
} from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";

// interface initialAddressState = {
//     name: "",
//     line1: "",
//     line2: "",
//     state: "",
//     city: "",
//     postal_code: "",
//     country: "",
//     phone: "",
// };

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
    }

    return(

    )
}


export default CheckoutDetails;
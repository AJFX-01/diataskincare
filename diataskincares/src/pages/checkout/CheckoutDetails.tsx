import { useState } from "react";
import Card from "../../component/card/Card";
import { CountryDropdown } from "react-country-region-selector";
import styles from "./checkoutDetails.module.scss";
import { useDispatch } from "react-redux";
import {
  SAVE_SHIPPING_ADDRESSS,
} from "../../redux/slice/checkoutSlice";
import { useNavigate } from "react-router-dom";

const initialAddressState = {
    name: "",
    line1: "",
    line2: "",
    state: "",
    city: "",
    postal_code: "",
    country: "",
    phone: "",
};

const CheckoutDetails : Function = () => {
    const [shippingAddress, setShippingAddress] = useState({...initialAddressState,})
    return(

    )
}


export default CheckoutDetails;
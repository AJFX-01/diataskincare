import React, { useEffect, useState } from "react";
import useFetchDocument from "../../../hooks/useFetchDocuments";
import styles from "./adminOrderDetails.module.scss";
import { Link, useParams } from "react-router-dom";
import OrderStatus from "../orderstatus/OrderStatus";
import { useDispatch } from "react-redux";
import { STORE_ADDRESS } from "../../../redux/slice/orderSlice";
import useFetchCollection from "../../../hooks/useFetchCollection";
import Card from "../../../component/card/Card";
import Loader from "../../../component/loader/loader";

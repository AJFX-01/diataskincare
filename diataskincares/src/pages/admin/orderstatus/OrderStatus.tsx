import { doc, setDoc, Timestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { database } from "../../../firebase/firebase";
import Card from "../../../component/card/Card";
import Loader from "../../../component/loader/loader";
import styles from "./changeOrderStatus.module.scss";
import { BsInfoCircle } from "react-icons/bs";
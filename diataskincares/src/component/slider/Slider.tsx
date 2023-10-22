import React, { useState, useEffect } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { sliderData } from "./sliderData";
import "./slider.scss";
import { Link } from "react-router-dom";


interface SliderItem {
    image: string;
    heading: string;
    desc: string;
}


const Slider = () => {
    const [ currentSlide, setCurrentSlide ] = useState<number>(0);
    const slideLength : number = sliderData.length;

    
} 
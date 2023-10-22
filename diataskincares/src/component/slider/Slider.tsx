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

    const nextSlide = () => {
        setCurrentSlide(currentSlide === slideLength - 1 ? 0 : currentSlide + 1);
    }

    const prevSlide = () => {
        setCurrentSlide(currentSlide === 0 ? slideLength - 1 : currentSlide - 1);
    }


    const autoScroll : boolean = true;
    let slideInterval: NodeJS.Timeout | null;
    const intervalTime: number = 4000;

    useEffect(() => {
        setCurrentSlide(0);
    }, []);

    useEffect(() => {
        if (autoScroll) {
            const auto = () => {
                slideInterval = setInterval(nextSlide, intervalTime);
            };
            auto();
        }
        return () => {
            if (slideInterval) {
                clearInterval(slideInterval);
            }
        };
    }, [currentSlide, slideInterval, autoScroll]);
} 
'use client'

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { addDestination } from "../../../features/filter/employerFilterSlice";

const DestinationRangeSlider = () => {
    const { destination } = useSelector((state) => state.employerFilter);
    const [getDestination, setDestination] = useState([destination.min, destination.max]);

    const dispatch = useDispatch();

    // destination handler
    const handleOnChange = (value) => {
        setDestination(value);
    };

    const handleAfterChange = (value) => {
        dispatch(addDestination({ min: value[0], max: value[1] }));
    };

    useEffect(() => {
        setDestination([destination.min, destination.max]);
    }, [destination]);

    return (
        <div className="range-slider-one">
            <Slider 
                range
                min={0}
                max={100}
                value={getDestination}
                onChange={handleOnChange}
                onAfterChange={handleAfterChange}
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="area-amount">{getDestination[1]}</span>
                    km
                </div>
            </div>
        </div>
    );
};

export default DestinationRangeSlider;

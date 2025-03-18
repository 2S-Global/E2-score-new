'use client'

import { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDispatch, useSelector } from "react-redux";
import { addFoundationDate } from "../../../features/filter/employerFilterSlice";

const FoundationDate = () => {
    const { foundationDate: getFoundationDate } =
        useSelector((state) => state.employerFilter) || {};
        
    const [foundationDate, setFoundationDate] = useState({
        min: getFoundationDate.min,
        max: getFoundationDate.max,
    });

    const dispatch = useDispatch();

    const handleOnChange = (value) => {
        setFoundationDate({ min: value[0], max: value[1] });
        dispatch(addFoundationDate({ min: value[0], max: value[1] }));
    };

    useEffect(() => {
        setFoundationDate(getFoundationDate);
    }, [getFoundationDate]);

    return (
        <div className="range-slider-one salary-range">
            <Slider
                range
                min={1900}
                max={2028}
                value={[foundationDate.min, foundationDate.max]}
                onChange={handleOnChange}
            />
            <div className="input-outer">
                <div className="amount-outer">
                    <span className="d-inline-flex align-items-center">
                        <span className="min">{foundationDate.min}</span>
                        <span className="max ms-2">{foundationDate.max}</span>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default FoundationDate;

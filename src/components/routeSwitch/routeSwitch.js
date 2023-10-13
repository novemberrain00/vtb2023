import React from "react";
import {changeType} from "../../redux/slices/routeTypeSlice";
import { useDispatch } from "react-redux";

const RouteSwitch = () => {
    const dispatch = useDispatch();

    return (
        <div className="route-switch"> 
            <input type='radio' name='route-type' value='auto' onClick={() => dispatch(changeType())}/> автомобильный
            <input type='radio' name='route-type' value='pedestrian' onClick={() => dispatch(changeType())}/> пешеходный
        </div>
    );
};

export default RouteSwitch;
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useState } from 'react';

import { setFilters } from '../../redux/slices/bankFiltersSlice';

import './filter.css';

const Filter = ({inputsArr, title}) => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.bankFilters.filters);

    const [localFilters, setLocalFilters] = useState({})

    const handleChange = (e, input) => {
        if(e.target.checked) {
            setLocalFilters({...localFilters, 
                [input.filterName]: true
            });
        } else {
            setLocalFilters({...localFilters, 
                [input.filterName]: false
            });
        }
    }

    useEffect(()=> {
        console.log(filters)
    }, [filters])

    useEffect(() => {
        dispatch(setFilters({
            ...filters,
            ...localFilters
        }));
    }, [localFilters])

    return (
        <div className='filter'>
            <h3 className='filter-title'>{title}</h3>
            <div className='filter-group'>
                {
                    inputsArr.map((input, i) => {
                        const id = Math.floor(Math.random()*10000);
                        return (
                            <label key={i+''} htmlFor={id} className='filter-item'>
                                <input 
                                    onChange={(e) => handleChange(e, input)} 
                                    type='checkbox' 
                                    id={id} 
                                    className='checkbox'
                                />
                                {input.text}
                            </label>
                        )
                    })
                }
            </div>
        </div>
    );
}

export default Filter;

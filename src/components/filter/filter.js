import React from 'react';

import './filter.css';

const Filter = ({inputsArr, title}) => {
    return (
        <div className='filter'>
            <h3 className='filter-title'>{title}</h3>
            <div className='filter-group'>
                {
                    inputsArr.map((input, i) => {
                        return (
                            <label key={i+''} htmlFor={title + i} className='filter-item'>
                                <input type='checkbox' id={title + i} className='checkbox'/>
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

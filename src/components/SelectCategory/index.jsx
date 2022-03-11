import React, { useState } from "react";
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const SelectCategory = ({ type, category, categories, setCategory }) => {
    const [selected, setSelected] = useState(category);

    function handleSelect (e, category) {
        e.preventDefault();
        setSelected(category);
        setCategory(category);
    }

    categories = [...Object.values(categories)]

    return (
        <div className="row">
            {
                categories.filter(category => category.type === type).map(category => {
                    const { name, iconName, id } = category;
                    const backColor = (selected && selected.id * 1 === id * 1) ? '#337eff' : "#eff0ef";
                    const iconColor = (selected && selected.id * 1 === id * 1) ? '#fff' : "#555";
                    return (
                        <div key={id} className='col-3' style={{ textAlign: 'center' }} onClick={(e) => handleSelect(e, category)}>
                            <Ionicon
                                className="rounded-circle"
                                fontSize="45px"
                                style={{ backgroundColor: backColor, padding: '6px' }}
                                color={iconColor}
                                icon={iconName}
                            />
                            <p>{name}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

SelectCategory.propTypes = {
    type: PropTypes.string.isRequired,
    category: PropTypes.object, 
    categories: PropTypes.object.isRequired, 
    setCategory: PropTypes.func.isRequired
}

export default SelectCategory
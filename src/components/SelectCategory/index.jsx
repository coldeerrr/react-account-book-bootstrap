import React, { useState } from "react";
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'

const categories = [
    {
        "name": "旅行",
        "iconName": "ios-plane",
        "id": "1",
        "type": "outcome"
    },
    {
        "name": "餐饮",
        "iconName": "ios-restaurant",
        "id": "2",
        "type": "outcome"
    },
    {
        "name": "购物",
        "iconName": "ios-basket",
        "id": "3",
        "type": "outcome"
    },
    {
        "name": "数码",
        "iconName": "ios-phone-portrait",
        "id": "4",
        "type": "outcome"
    },
    {
        "name": "交通",
        "iconName": "ios-train",
        "id": "5",
        "type": "outcome"
    },
    {
        "name": "娱乐",
        "iconName": "ios-beer",
        "id": "6",
        "type": "outcome"
    },
    {
        "name": "汽车",
        "iconName": "ios-car",
        "id": "7",
        "type": "outcome"
    },
    {
        "name": "医疗",
        "iconName": "ios-medkit",
        "id": "8",
        "type": "outcome"
    },
    {
        "name": "体育",
        "iconName": "ios-football",
        "id": "9",
        "type": "outcome"
    },
    {
        "name": "宠物",
        "iconName": "ios-paw",
        "id": "10",
        "type": "outcome"
    },
    {
        "name": "其他",
        "iconName": "ios-apps",
        "id": "11",
        "type": "outcome"
    },
    {
        "name": "工资",
        "iconName": "ios-card",
        "id": "12",
        "type": "income"
    },
    {
        "name": "兼职",
        "iconName": "ios-cash",
        "id": "13",
        "type": "income"
    },
    {
        "name": "理财",
        "iconName": "logo-yen",
        "id": "14",
        "type": "income"
    },
    {
        "name": "礼金",
        "iconName": "logo-yen",
        "id": "15",
        "type": "income"
    },
    {
        "name": "其他",
        "iconName": "ios-apps",
        "id": "16",
        "type": "income"
    }
];

const SelectCategory = ({ type, category, setCategory }) => {
    const [selected, setSelected] = useState(category);

    function handleSelect (e, category) {
        e.preventDefault();
        setSelected(category);
        setCategory(category);
    }

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
    type: PropTypes.string.isRequired
}

export default SelectCategory
import React, { useState, useEffect, useRef } from "react";
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import { padLeft, createArr } from '../../utils/functions'

const MonthPicker = ({ year, month, changeMonth }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentYear, setCurrentYear] = useState(year);
    const [currentMonth, setCurrentMonth] = useState(month);
    const btn = useRef();
    const yearBtn = useRef();

    useEffect(() => {
        document.addEventListener('click', handleClick, false);
        return () => {
            document.removeEventListener('click', handleClick, false);
        }
    }, [])

    // 点击除选择框以外的地方选择框收起
    function handleClick(e) {
        if (yearBtn.current && !yearBtn.current.contains(e.target)){
            // 忽略选择框
            if (btn.current && btn.current.contains(e.target)) {
                return;
            }
            setIsOpen(false);
        }
    }

    function handleDropdown(e) {
        e.preventDefault();
        setIsOpen(!isOpen);
    }

    function selectYear(e, yearItem) {
        e.preventDefault();
        setCurrentYear(yearItem);
    }

    function selectMonth(e, monthItem) {
        e.preventDefault();
        setCurrentMonth(monthItem);
        changeMonth(currentYear, monthItem)
        setIsOpen(false);
    }

    // 生成年月数组
    const monthArr = createArr(12, 1);
    const yearArr = createArr(9, -4).map(num => num + year);

    return (
        <div className="dropdown month-picker-component">
            <p>选择月份</p>
            <button
                className="btn btn-lg btn-secondary dropdown-toggle"
                onClick={handleDropdown}
                ref={btn}
            >
                {`${currentYear}年${padLeft(currentMonth)}月`}
            </button>
            {isOpen &&
                <div className="dropdown-menu" style={{ display: 'block' }}>
                    <div className="row">
                        <div className="col border-right" ref={yearBtn}>
                            {yearArr.map((yearItem, index) =>
                                <a
                                    href="#"
                                    onClick={(e) => { selectYear(e, yearItem) }}
                                    className={yearItem === currentYear ? 'dropdown-item active' : 'dropdown-item'}
                                    key={index}
                                >
                                    {yearItem}年
                                </a>
                            )}
                        </div>
                        <div className="col">
                            {monthArr.map((monthItem, index) =>
                                <a
                                    href="#"
                                    onClick={(e) => { selectMonth(e, monthItem) }}
                                    className={monthItem === currentMonth ? 'dropdown-item active' : 'dropdown-item'}
                                    key={index}
                                >
                                    {padLeft(monthItem)}月
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

MonthPicker.propTypes = {
    year: PropTypes.number.isRequired,
    month: PropTypes.number.isRequired,
    changeMonth: PropTypes.func.isRequired
}

export default MonthPicker
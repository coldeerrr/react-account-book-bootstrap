import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { isValidDate } from "../../utils/functions";

const SelectForm = ({ category, id }) => {
    const titleInput = useRef();
    const priceInput = useRef();
    const dateInput = useRef();
    const [validatePass, setValidatePass] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')

    function submitForm(e) {
        const title = titleInput.current.value.trim() * 1;
        const price = priceInput.current.value.trim();
        const date = dateInput.current.value.trim();
        const editMode = !!id; // 感叹号转换布尔值, 双感叹号取反, 判断是否为编辑模式

        if (title && price && date) {
            if (price < 0) {
                setErrorMessage('价格数字必须大于0')
                setValidatePass(false)
            } else if (!isValidDate(date)) {
                setErrorMessage('请填写正确的日期格式')
                setValidatePass(false)
            } else {
                setErrorMessage('')
                setValidatePass(true)
                if (editMode) {
                    console.log('edit mode');
                } else {
                    console.log(title, price, date);
                }
            }
        } else {
            setErrorMessage('请填写所有必须项')
            setValidatePass(false)
        }
        e.preventDefault();
    }

    return (
        <form onSubmit={(e) => submitForm(e)}>
            <div className="form-group">
                <label htmlFor="title">标题 *</label>
                <input
                    type="text" className="form-control"
                    id="title" placeholder="请输入标题"
                    defaultValue="" ref={titleInput} />
            </div>
            <div className="form-group">
                <label htmlFor="price">价格 *</label>
                <div className="input-group">
                    <div className="input-group-prepend">
                        <span className="input-group-text">¥</span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        id="price" placeholder="请输入价格"
                        defaultValue="" ref={priceInput}
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="date">日期 *</label>
                <input
                    type="date" className="form-control"
                    id="date" placeholder="请输入日期"
                    defaultValue="" ref={dateInput}
                />
            </div>
            <button type="submit" className="btn btn-primary mr-3">提交</button>
            <button className="btn btn-secondary"> 取消 </button>
            {
                !validatePass &&
                <div className="alert alert-danger mt-5" role="alert">
                    {errorMessage}
                </div>
            }
        </form>
    )
}

export default SelectForm
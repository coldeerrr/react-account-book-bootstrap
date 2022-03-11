import React, { useRef, useState } from "react";
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom'
import { isValidDate } from "../../utils/functions";

const SelectForm = ({ category, editItem, onSubmitForm }) => {
    const titleInput = useRef();
    const priceInput = useRef();
    const dateInput = useRef();
    const [validatePass, setValidatePass] = useState(true);
    const [errorMessage, setErrorMessage] = useState('')
    const navigate = useNavigate();

    const defaultTitle = editItem ? editItem.title : '';
    const defaultPrice = editItem ? editItem.price : '';
    const defaultDate = editItem ? editItem.date : '';

    function handleSubmitForm(e) {
        const title = titleInput.current.value.trim();
        const price = priceInput.current.value.trim() * 1;
        const date = dateInput.current.value.trim();
        const editMode = !!editItem; // 感叹号转换布尔值, 双感叹号取反, 判断是否为编辑模式

        if (title && price && date) {
            if (price < 0) {
                setErrorMessage('价格数字必须大于0')
                setValidatePass(false)
            } else if (!isValidDate(date)) {
                setErrorMessage('请填写正确的日期格式')
                setValidatePass(false)
            } else if (!category) {
                setErrorMessage('请选择一个种类')
                setValidatePass(false)
            } else {
                setErrorMessage('')
                setValidatePass(true)
                if (editMode) {
                    onSubmitForm({
                        ...editItem,
                        title,
                        price,
                        date
                    }, editMode);
                    navigate('/')
                } else {
                    onSubmitForm({
                        id: Math.random().toString().slice(2), //生成随机数
                        price, title, date,
                        cid: category.id
                    }, editMode);
                    navigate('/')
                }
            }
        } else {
            setErrorMessage('请填写所有必须项')
            setValidatePass(false)
        }
        e.preventDefault();
    }

    function handleCancleSubmit() {
        navigate('/')
    }

    return (
        <form onSubmit={(e) => handleSubmitForm(e)}>
            <div className="form-group">
                <label htmlFor="title">标题 *</label>
                <input
                    type="text" className="form-control"
                    id="title" placeholder="请输入标题"
                    defaultValue={defaultTitle} ref={titleInput} />
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
                        defaultValue={defaultPrice} ref={priceInput}
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="date">日期 *</label>
                <input
                    type="date" className="form-control"
                    id="date" placeholder="请输入日期"
                    defaultValue={defaultDate} ref={dateInput}
                />
            </div>
            <button type="submit" className="btn btn-primary mr-3">提交</button>
            <button className="btn btn-secondary" onClick={handleCancleSubmit}> 取消 </button>
            {
                !validatePass &&
                <div className="alert alert-danger mt-5" role="alert">
                    {errorMessage}
                </div>
            }
        </form>
    )
}

SelectForm.propTypes = {
    category: PropTypes.object, 
    editItem: PropTypes.object, 
    onSubmitForm: PropTypes.func.isRequired
}

export default SelectForm
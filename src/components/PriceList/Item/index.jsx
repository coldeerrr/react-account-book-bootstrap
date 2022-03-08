import React from 'react'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import './index.css'

const Item = ({ item, items, setItems }) => {
    function onModifyItem(curr) {
        const modifiedItems = items.map(item => {
            if (item.id === curr.id) {
                return {...item, title:'我更新了'}
            }else {
                return item
            }
        });
        setItems(modifiedItems)
    }

    function onDeleteItem(curr) {
        const filteredItems = items.filter(item => item.id !== curr.id );
        setItems(filteredItems);
    }

    return (
        <li className='list-group-item d-flex justify-content-between align-items-center'>
            <span className='col-1'>
                <Ionicon
                    className="rounded-circle"
                    fontSize="30px"
                    style={{backgroundColor: '#bfa', padding: '5px'}}
                    color={'#fff'}
                    icon={item.category.iconName}
                />
            </span>
            <span className='col-5'>{item.title}</span>
            <span className='col-2 font-weight-bold'>
                {item.category.type === 'income' ? '+' : "-"}
                {item.price}元
            </span>
            <span className='col-2'>{item.date}</span>
            <button className='col-1'
                onClick={() => { onModifyItem(item) }}>
                <Ionicon 
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: '#bfa', padding: '5px'}}
                color={'#fff'}
                icon='ios-create-outline'
              />
            </button>
            <button className='col-1'
                onClick={() => { onDeleteItem(item) }}>
                <Ionicon 
                className="rounded-circle"
                fontSize="30px"
                style={{ backgroundColor: 'red', padding: '5px'}}
                color={'#fff'}
                icon='ios-close'
              />
            </button>
        </li>
    )
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired
}

export default Item
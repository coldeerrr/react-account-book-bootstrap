import React from 'react'
import { useNavigate } from 'react-router-dom'
import Ionicon from 'react-ionicons'
import PropTypes from 'prop-types'
import './index.css'

const PriceList = ({ items, onDeleteItem }) => {

    const navigate = useNavigate();

    function onModifyItem(curr) {
        navigate(`/edit/${curr.id}`)
    }

    return (
        <ul className='list-group list-group-flush'>
            {
                items.map(item => (
                    <li key={item.id} className='list-group-item d-flex justify-content-between align-items-center'>
                        <span className='col-1'>
                            <Ionicon
                                className="rounded-circle"
                                fontSize="35px"
                                style={{ backgroundColor: '#bfa', padding: '4px' }}
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
                                fontSize="35px"
                                style={{ backgroundColor: '#bfa', padding: '4px' }}
                                color={'#fff'}
                                icon='ios-create-outline'
                            />
                        </button>
                        <button className='col-1'
                            onClick={(e) => { e.preventDefault(); onDeleteItem(item) }}>
                            <Ionicon
                                className="rounded-circle"
                                fontSize="35px"
                                style={{ backgroundColor: 'red', padding: '4px' }}
                                color={'#fff'}
                                icon='ios-close'
                            />
                        </button>
                    </li>
                ))
            }
        </ul>
    )
}

PriceList.propTypes = {
    items: PropTypes.array.isRequired,
    onDeleteItem: PropTypes.func.isRequired
}

export default PriceList
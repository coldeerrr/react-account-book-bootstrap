import React from 'react'
import PropTypes from 'prop-types'
import Item from './Item'

const PriceList = ({items, setItems}) => {
    return (
        <ul className='list-group list-group-flush'>
            {
                items.map(item => {
                    return <Item key={item.id} item={item} items={items} setItems={setItems}/>
                })
            }
        </ul>
    )
}

PriceList.propTypes = {
    items: PropTypes.array.isRequired,
    setItems: PropTypes.func.isRequired
}

export default PriceList
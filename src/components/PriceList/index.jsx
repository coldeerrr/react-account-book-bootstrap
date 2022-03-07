import React from 'react'
import Item from './Item'

const PriceList = ({items}) => {
    return (
        <ul className='list-group list-group-flush'>
            {
                items.map(item => {
                    return <Item key={item.id} item={item}/>
                })
            }
        </ul>
    )
}

export default PriceList
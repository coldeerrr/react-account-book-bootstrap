import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import PriceList from './components/PriceList'

const items = [
    {
        id: 1,
        title: 'HangZhou travel',
        price: 200,
        date: '2022-3-7',
        category: {
            id: 1,
            name: '旅行',
            type: 'income'
        }
    },
    {
        id: 2,
        title: 'Buy something',
        price: 200,
        date: '2022-3-7',
        category: {
            id: 1,
            name: '购物',
            type: 'income'
        }
    }
]

const App = () => {
    return (
        <div>
            <PriceList
                items={items}
            />
        </div>
    )
}

export default App
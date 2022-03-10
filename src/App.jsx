import React, { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'
import Create from './pages/Create'
import { flatternArr } from './utils/functions'

const categoriesArr = [
    {
        id: 1,
        name: '旅行',
        type: 'outcome',
        iconName: 'ios-plane'
    },
    {
        id: 2,
        name: '购物',
        type: 'income',
        iconName: 'ios-plane'
    }
]
const itemsArr = [
    {
        id: 1,
        title: 'HangZhou travel',
        price: 200,
        date: '2022-03-07',
        cid: 1
    },
    {
        id: 2,
        title: 'Buy something',
        price: 200,
        date: '2022-03-07',
        cid: 2
    },
    {
        id: 3,
        title: 'Buy something',
        price: 50,
        date: '2022-04-07',
        cid: 1
    }
];

export const AppContext = React.createContext();

const App = () => {
    const [categories, setCategories] = useState(flatternArr(categoriesArr));
    const [items, setItems] = useState(flatternArr(itemsArr));

    const actions = {
        deleteItem: (item) => {
            delete items[item.id];
            setItems({ ...items })
        },
        createItem: (item, category) => {
            const cateNum = Object.keys(categories).length + 1;
            setItems(Object.assign({ [item.id]: item }, { ...items }));
            setCategories(Object.assign({ [cateNum]: category }, { ...categories }));
            console.log(category, categories, items);
        },
        updateItem: (item, category) => {
            const updatedItem = {
                ...item,
                cid: category.id,
                title: item.title,
                price: item.price,
                date: item.date
            };
            setItems(Object.assign({...items}, {[updatedItem.id]: updatedItem}))
        },
    }

    return (
        <AppContext.Provider value={{ categories, items, actions }}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='create' element={<Create />} />
                    <Route path='edit/:id' element={<Create />} />
                </Routes>
            </BrowserRouter>
        </AppContext.Provider>
    )
}

export default App
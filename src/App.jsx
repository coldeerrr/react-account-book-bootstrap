import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home'
import Create from './pages/Create'
import { flatternArr, parseToYearAndMonth } from './utils/functions'
import axios from 'axios'

// const categoriesArr = [
//     {
//         id: 1,
//         name: '旅行',
//         type: 'outcome',
//         iconName: 'ios-plane'
//     },
//     {
//         id: 2,
//         name: '购物',
//         type: 'income',
//         iconName: 'ios-plane'
//     }
// ]
// const itemsArr = [
//     {
//         id: 1,
//         title: 'HangZhou travel',
//         price: 200,
//         date: '2022-03-07',
//         cid: 1
//     },
//     {
//         id: 2,
//         title: 'Buy something',
//         price: 200,
//         date: '2022-03-07',
//         cid: 2
//     },
//     {
//         id: 3,
//         title: 'Buy something',
//         price: 50,
//         date: '2022-04-07',
//         cid: 1
//     }
// ];

export const AppContext = React.createContext();

const App = () => {
    const [categories, setCategories] = useState({});
    const [items, setItems] = useState({});
    const [currentDate, setCurrentDate] = useState(parseToYearAndMonth());
    const [isLoading, setIsLoading] = useState(false);

    const actions = {
        deleteItem: async (item) => {
            const deleteItem = await axios.delete(`/items/${item.id}`)
            delete items[item.id];
            setItems({ ...items });
        },
        createItem: (item, category) => {
            const cateNum = Object.keys(categories).length + 1;
            const parseDate = parseToYearAndMonth(item.date);
            item.monthCategory = `${parseDate.year}-${parseDate.month}`;
            item.timestamp = new Date(item.date).getTime();
            setItems(Object.assign({ [item.id]: item }, { ...items }));
            setCategories(Object.assign({ [cateNum]: category }, { ...categories }));
        },
        updateItem: (item, category) => {
            const parseDate = parseToYearAndMonth(item.date);
            const updatedItem = {
                ...item,
                cid: category.id,
                title: item.title,
                price: item.price,
                date: item.date,
                timestamp: new Date(item.date).getTime(),
                monthCategory: `${parseDate.year}-${parseDate.month}`
            };
            console.log(updatedItem);
            setItems(Object.assign({ ...items }, { [updatedItem.id]: updatedItem }))
        },
        getInitalData: async () => {
            setIsLoading(true);
            const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
            const resultArr = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)]);
            const [categoriesArr, itemsArr] = resultArr;
            setCategories(flatternArr(categoriesArr.data));
            setItems(flatternArr(itemsArr.data));
            setIsLoading(false);
        },
        selectMonth: async (year, month) => {
            const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
            const items = await axios.get(getURLWithData)
            setItems(flatternArr(items.data));
            setCurrentDate({ year, month });
        }
    }

    return (
        <AppContext.Provider value={{ categories, items, currentDate, isLoading, actions }}>
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
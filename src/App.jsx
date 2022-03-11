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

    // 加载中执行的函数, 使用闭包
    function withLoading(callback) {
        return (...args) => {
            setIsLoading(true);
            return callback(...args)
        }
    }

    const actions = {
        deleteItem: withLoading(async (item) => {
            const deleteItem = await axios.delete(`/items/${item.id}`)
            delete items[item.id];
            setItems({ ...items });
            setIsLoading(false);
        }),
        createItem: withLoading(async (item, category) => {
            const parseDate = parseToYearAndMonth(item.date);
            item.monthCategory = `${parseDate.year}-${parseDate.month}`;
            item.timestamp = new Date(item.date).getTime();
            const newItem = await axios.post('/items', { ...item });
            setItems({ [item.id]: newItem.data, ...items });
            setIsLoading(false)
        }),
        updateItem: withLoading(async (item, category) => {
            const parseDate = parseToYearAndMonth(item.date);
            const updatedItem = await axios.put(`/items/${item.id}`, {
                ...item,
                cid: category.id,
                timestamp: new Date(item.date).getTime(),
                monthCategory: `${parseDate.year}-${parseDate.month}`
            })
            setItems({ [item.id]: updatedItem.data, ...items })
        }),
        getInitalData: withLoading(async () => {
            const getURLWithData = `/items?monthCategory=${currentDate.year}-${currentDate.month}&_sort=timestamp&_order=desc`;
            const resultArr = await Promise.all([axios.get('/categories'), axios.get(getURLWithData)]);
            const [categoriesArr, itemsArr] = resultArr;
            setCategories(flatternArr(categoriesArr.data));
            setItems(flatternArr(itemsArr.data));
            setIsLoading(false);
        }),
        getEditData: withLoading(async (id) => {
            // 判断是否数据被首页加载过
            let promiseArr = [];
            const itemIsLoaded = (Object.keys(items).indexOf(id) > -1); // true为加载过
            if (Object.keys(categories).length === 0) {
                promiseArr.push(axios.get('/categories'));
            }
        
            if (id && !itemIsLoaded) {
                const getURLWithID = `/items/${id}`;
                promiseArr.push(axios.get(getURLWithID));
            }
            
            // 异步获取的数据
            const [categoriesArr, editItem] = await Promise.all(promiseArr);

            // 判断获取的数据从何而来, 最终赋值
            const finalCategories = categoriesArr ? flatternArr(categoriesArr.data) : categories;
            const finalItem = editItem ? editItem.data : items[id];

            if (id) {
                setCategories(finalCategories);
                setIsLoading(false);
                setItems({ ...items, [id]: finalItem });
            } else {
                setCategories(finalCategories);
                setIsLoading(false);
            }
            // return {
            //     categories: finalCategories,
            //     editItem: finalItem
            // }
        }),
        selectMonth: withLoading(async (year, month) => {
            const getURLWithData = `/items?monthCategory=${year}-${month}&_sort=timestamp&_order=desc`;
            const items = await axios.get(getURLWithData)
            setItems(flatternArr(items.data));
            setCurrentDate({ year, month });
            setIsLoading(false);
        })
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
import React, { useState, useEffect } from 'react'
import PriceList from '../../components/PriceList'
import Tabs from '../../components/Tabs'
import MonthPicker from '../../components/MonthPicker'
import TotalPrice from '../../components/TotalPrice'
import CreateBtn from '../../components/CreateBtn'
import './index.css'
import { TYPE_INCOME, TYPE_OUTCOME } from '../../utils/constants'
import { parseToYearAndMonth, padLeft } from '../../utils/functions'
import withContext from '../../withContext'

// const items = [
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
// ]

// const categories = {
//     1: {
//         id: 1,
//         name: '旅行',
//         type: 'outcome',
//         iconName: 'ios-plane'
//     },
//     2: {
//         id: 1,
//         name: '购物',
//         type: 'income',
//         iconName: 'ios-plane'
//     }
// }

const Home = props => {
    let { categories, items } = props;
    items = [...Object.values(items)];

    const [currentDate, setCurrentDate] = useState(parseToYearAndMonth())

    const itemsWithCategory = items.map(item => {
        for (let c in categories) {
            if ((categories[c].id * 1) === item.cid)
                item.category = categories[c];
        }
        // item.category = categories[item.cid];
        return item;
    }).filter(item => {
        return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    });

    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
        if (item.category.type === TYPE_INCOME) {
            totalIncome += item.price
        } else {
            totalOutcome += item.price
        }
    })

    function deleteItem(item) {
        props.actions.deleteItem(item);
    }

    return (
        <>
            <header className='home-header'>
                <div className='row'>
                    <div className="col picker">
                        <MonthPicker year={currentDate.year} month={currentDate.month} setCurrentDate={setCurrentDate} />
                    </div>
                    <div className="col">
                        <TotalPrice income={totalIncome} outcome={totalOutcome} />
                    </div>
                </div>
            </header>
            <div className='content-area py-3 px-3'>
                <Tabs>
                    <div label="列表模式" icon="ios-paper">
                        <CreateBtn />
                        {
                            itemsWithCategory.length === 0 ? <div className="alert alert-light text-center no-record">您没有任何记账记录</div> :
                                <PriceList
                                    items={itemsWithCategory}
                                    onDeleteItem={deleteItem}
                                />
                        }
                    </div>
                    <div label="图表模式" icon="ios-pie">
                        <CreateBtn />
                    </div>
                </Tabs>
            </div>
        </>
    )
}

export default withContext(Home)
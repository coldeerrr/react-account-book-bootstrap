import React, { useState, useEffect } from 'react'
import PriceList from '../../components/PriceList'
import ViewTab from '../../components/ViewTab'
import MonthPicker from '../../components/MonthPicker'
import TotalPrice from '../../components/TotalPrice'
import CreateBtn from '../../components/CreateBtn'
import './index.css'
import { TYPE_INCOME, TYPE_OUTCOME } from '../../utils/constants'
import { parseToYearAndMonth, padLeft } from '../../utils/functions'

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
]

const categoies = {
    1: {
        id: 1,
        name: '旅行',
        type: 'outcome',
        iconName: 'ios-plane'
    },
    2: {
        id: 1,
        name: '购物',
        type: 'income',
        iconName: 'ios-plane'
    }
}

const Home = () => {

    const [items, setItems] = useState(itemsArr)
    const [currentDate, setCurrentDate] = useState(parseToYearAndMonth())

    const itemsWithCategory = items.map(item => {
        item.category = categoies[item.cid];
        return item;
    }).filter(item => {
        return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    })

    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
        if (item.category.type === TYPE_INCOME) {
            totalIncome += item.price
        } else {
            totalOutcome += item.price
        }
    })

    return (
        <>
            <header className='home-header'>
                <div className='row'>
                    <div className="col picker">
                        <MonthPicker year={currentDate.year} month={currentDate.month} setCurrentDate={setCurrentDate}/>
                    </div>
                    <div className="col">
                        <TotalPrice income={totalIncome} outcome={totalOutcome} />
                    </div>
                </div>
            </header>
            <div className='content-area py-3 px-3'>
                <ViewTab>
                    <div label="列表模式" icon="ios-paper">
                        <CreateBtn onCreate={setItems} preItems={items} />
                        <PriceList
                            items={itemsWithCategory}
                            setItems={setItems}
                        />
                    </div>
                    <div label="图表模式" icon="ios-pie">
                        <CreateBtn onCreate={setItems} preItems={items} />
                    </div>
                </ViewTab>
            </div>
        </>
    )
}

export default Home
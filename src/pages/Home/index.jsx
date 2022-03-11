import React, { useState, useEffect } from 'react'
import PriceList from '../../components/PriceList'
import Tabs from '../../components/Tabs'
import MonthPicker from '../../components/MonthPicker'
import TotalPrice from '../../components/TotalPrice'
import CreateBtn from '../../components/CreateBtn'
import Loader from '../../components/Loader'
import './index.css'
import { TYPE_INCOME, TYPE_OUTCOME } from '../../utils/constants'
import { parseToYearAndMonth, padLeft } from '../../utils/functions'
import withContext from '../../withContext'

const Home = props => {

    let { categories, items, currentDate, isLoading, actions } = props;
    items = [...Object.values(items)];

    const itemsWithCategory = items.map(item => {
        item.category = categories[item.cid];
        return item;
    }).filter(item => {
        return item.date.includes(`${currentDate.year}-${padLeft(currentDate.month)}`)
    });

    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach(item => {
        if (item.category.type === TYPE_INCOME) {
            totalIncome += item.price
        } else if (item.category.type === TYPE_OUTCOME) {
            totalOutcome += item.price
        }
    })

    function deleteItem(item) {
        actions.deleteItem(item);
    }

    function changeMonth(year, month) {
        actions.selectMonth(year, month)
    }

    useEffect(() => {
        actions.getInitalData();
    }, [])

    return (
        <>
            <header className='home-header'>
                <div className='row'>
                    <div className="col picker">
                        <MonthPicker year={currentDate.year} month={currentDate.month} changeMonth={changeMonth} />
                    </div>
                    <div className="col">
                        <TotalPrice income={totalIncome} outcome={totalOutcome} />
                    </div>
                </div>
            </header>
            {isLoading ? <Loader /> :
                <>
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

            }
        </>
    )
}

export default withContext(Home)
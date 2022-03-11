import React from "react";
import { AppContext } from './App'

const withContext = (Component) => {
    return (props) => (
        <AppContext.Consumer>
            { ({categories, items, currentDate, isLoading, actions}) => {
                return <Component {...props} categories={categories} items={items} currentDate={currentDate} isLoading={isLoading} actions={actions} />
            }}
        </AppContext.Consumer>
    )
}

export default withContext
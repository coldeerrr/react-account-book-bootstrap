import React from "react";
import { AppContext } from './App'

const withContext = (Component) => {
    return (props) => (
        <AppContext.Consumer>
            { ({categories, items, actions}) => {
                return <Component {...props} categories={categories} items={items} actions={actions} />
            }}
        </AppContext.Consumer>
    )
}

export default withContext
import React from "react";
import { AppContext } from './App'

const withContext = (Component) => {
    return (props) => (
        <AppContext.Consumer>
            { ({categories, items}) => {
                return <Component {...props} categories={categories} items={items} />
            }}
        </AppContext.Consumer>
    )
}

export default withContext
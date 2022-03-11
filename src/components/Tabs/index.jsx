import React, { useState } from 'react'
import Ionicon from 'react-ionicons'

const Tabs = props => {
    const [currentIndex, setCurrentIndex] = useState(0);

    function handleTabClick(index) {
        setCurrentIndex(index);
    }

    function titleClass(index) {
        return index === currentIndex ? 'nav-link active' : 'nav-link';
    }

    return (
        <div>
            <ul className='nav nav-tabs nav-fill my-4'>
                {
                    React.Children.map(props.children, (ele, index) => {
                        return (
                            <li key={index} className="nav-item">
                                <a href="#" className={titleClass(index)} onClick={(e) => { e.preventDefault(); handleTabClick(index) }}>
                                    <Ionicon
                                        className="rounded-circle mr-2"
                                        fontSize="25px"
                                        color="#007bff"
                                        icon={ele.props.icon}
                                    />
                                    {ele.props.label}
                                </a>
                            </li>
                        )
                    })
                }
            </ul>
            <div>
                {
                    React.Children.map(props.children, (ele, index) => {
                        return (
                            currentIndex === index ? ele.props.children : ''
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Tabs
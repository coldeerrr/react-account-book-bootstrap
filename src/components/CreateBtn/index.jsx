import React from 'react'
import PropTypes from 'prop-types'
import Ionicon from 'react-ionicons'

const newItem = {
  id: 4,
  title: 'HangZhou travel',
  price: 200,
  date: '2022-03-07',
  cid: 1
};

const CreateBtn = ({ onCreate, preItems }) => {
  function handleClick(e) {
    e.preventDefault();
    onCreate([newItem, ...preItems])
  }


  return (
    <button
      className="btn btn-primary btn-block d-flex justify-content-center align-items-center"
      onClick={(e) => handleClick(e)}
    >
      <Ionicon
        className="rounded-circle"
        fontSize="30px"
        color='#fff'
        icon='ios-add-circle'
      />
      创建一条新的记账记录
    </button>
  )
}

CreateBtn.propTypes = {
  onCreate: PropTypes.func.isRequired,
  preItems: PropTypes.array.isRequired
}

export default CreateBtn
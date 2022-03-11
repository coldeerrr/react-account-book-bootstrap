import React from 'react'
import Ionicon from 'react-ionicons'
import { useNavigate } from 'react-router-dom'

const CreateBtn = () => {

  const navigate = useNavigate();

  function handleClick(e) {
    e.preventDefault();
    navigate('/create')
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

export default CreateBtn
import './Success.css'
import  success from '../images/icon-success-check.svg'
import $ from 'jquery'
import React, { useState, useEffect } from 'react';

export default function Success () {

  const [isVisible, setIsVisible] = useState(false);
  $(".App").addClass("margin-top")

  useEffect(() => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    },10000)
  }, []);

  return (
    <div className={`success ${isVisible ? 'visible' : 'vanish'}`}>
      <div className='flex'>
        <img src={success} alt='success' className='success-img'/>
        <p className='img-p'>Message Sent!</p>
      </div>
      <p className='success-p'>Thanks for completing the form. We'll be in touch soon!</p>
    </div>
  )
} 
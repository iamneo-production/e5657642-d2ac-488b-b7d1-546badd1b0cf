import React, { useEffect } from "react";

const Header = () => {

    useEffect(() => {
        const handleScroll = () => {
          const header1 = document.getElementById('header1');
    
          if (window.pageYOffset > 0) {
            header1.classList.add('head-sticky');
          } else {
            header1.classList.remove('head-sticky');
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);
      
  return (
        <div id='header1'>
          <div style={{
            fontSize:"25px",
            fontStyle: 'bold',
          }} className='header1'>
            <h3>Personal Finance Manager</h3>
            <div className='header-username'>
              <h6>USERNAME</h6>
            </div>
          </div>
        </div>
  )
}

export default Header
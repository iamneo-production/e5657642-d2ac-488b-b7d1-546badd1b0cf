import React, { useEffect, useState} from "react";

const Header = () => {
  const [firstname, setFirstname] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const header1 = document.getElementById('header1');

      if (window.pageYOffset > 0) {
        header1.classList.add('head-sticky');
      } else {
        header1.classList.remove('head-sticky');
      }
    };

    const storedFirstname = localStorage.getItem('firstname');
    setFirstname(storedFirstname || "");

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id='header1'>
      <div className='header1'>
        <h3>Personal Finance Manager</h3>
        <div className='header-username'>
          <h6>Welcome <span>{firstname}</span></h6>
        </div>
      </div>
    </div>
  )
}

export default Header
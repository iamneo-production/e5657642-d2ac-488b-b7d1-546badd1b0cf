import React, { useEffect } from 'react';
import {
    FaRegChartBar,
    FaHome,
    FaHandHoldingUsd,
    FaFileInvoiceDollar,
    FaPiggyBank,
    FaLandmark,
    FaFileAlt
} from "react-icons/fa";
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

const SideBar = ({ children }) => {
  
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await axios.post('https://8080-afbabacabedeeeebcfbfbdcabeaeaadbdbabf.project.examly.io/logout');
            navigate('/');
            window.history.pushState(null, document.title, window.location.href);
            window.addEventListener('popstate', function (event) {
                window.history.pushState(null, document.title, window.location.href);
            });
        } catch (error) {
            console.log('Logout failed:', error);
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sidebar = document.getElementById('sidebar');

            if (window.pageYOffset > 0) {
                sidebar.classList.add('sticky');
            } else {
                sidebar.classList.remove('sticky');
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const menuItem = [
        {
            path: "/dashboard",
            name: "Home",
            icon: <FaHome />
        },
        {
            path: "/budget",
            name: "Budget",
            icon: <FaRegChartBar />
        },
        {
            path: "/transaction",
            name: "Transaction",
            icon: <FaFileAlt />
        },
        {
            path: "/accounts",
            name: "Accounts",
            icon: <FaLandmark />
        },
        {
            path: "/goals",
            name: "Goals",
            icon: <FaPiggyBank />
        },
        {
            path: "/debts",
            name: "Debts",
            icon: <FaHandHoldingUsd />
        },
        {
            path: "/reports",
            name: "Reports",
            icon: <FaFileInvoiceDollar />
        },
    ];

    return (
        <div className="container">
            <div className="sidebar" id='sidebar'>
                <div className='top_section'>
                    <div className="nav-footer">
                        <button onClick={handleLogout}>
                            LOGOUT
                        </button>
                    </div>
                </div>
                {menuItem.map((item, index) => (
                    <NavLink to={item.path} key={index} className='link' activeClassName="active">
                        <div className="icon">{item.icon}</div>
                        <div className="link_text">{item.name}</div>
                    </NavLink>
                ))}
            </div>
            <main>{children}</main>
        </div>
    );
};

export default SideBar;
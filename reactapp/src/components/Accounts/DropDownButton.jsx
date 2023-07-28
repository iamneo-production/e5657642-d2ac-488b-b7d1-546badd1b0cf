import React from 'react';
import './Account.css';

const DropDownButton = ({ accountList, handleSelectAccount, handleDeleteAccount, selectedAccountIndex }) => {

  return (
    <div className='dropdown'>
      <select className='dropdownSelect' onChange={handleSelectAccount}>
        <option value="">Select Account </option>
        {accountList.map((account, index) => (
          <option key={index} value={index}>{account.id}</option>
        ))}
      </select>
    </div>
  );
};

export default DropDownButton;
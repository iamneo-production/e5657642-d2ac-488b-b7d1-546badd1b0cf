// ... (other parts of the code remain the same)

useEffect(() => {
  // When the transactions state changes, save it in local storage
  const storedTransactions = JSON.parse(localStorage.getItem('lastViewedAccountTransactions'));
  const updatedStoredTransactions = { ...storedTransactions, [lastViewedAccountId]: transactions };
  localStorage.setItem('lastViewedAccountTransactions', JSON.stringify(updatedStoredTransactions));
}, [transactions, lastViewedAccountId]);

// ...

const fetchAccountData = async () => {
  if (!getaccountId || getaccountId === lastViewedAccountId) {
    return;
  }
  try {
    const response = await axios.get(`https://8080-dabaceabfbbcfbfbdcabeaeaadbdbabf.project.examly.io/accounts/id?id=${getaccountId}`);
    setAccountList(response.data);

    // Check if transactions exist for the selected account ID
    const storedTransactions = JSON.parse(localStorage.getItem('lastViewedAccountTransactions'));
    if (storedTransactions && storedTransactions[getaccountId] && storedTransactions[getaccountId].length > 0) {
      // If transactions exist, use them
      setTransactions(storedTransactions[getaccountId]);
    } else {
      // Otherwise, generate new random transactions
      generateRandomValues();
    }

    // Save the account data in local storage for the last viewed account
    const accountData = {
      accountId: getaccountId,
      accountDetails: response.data,
    };
    localStorage.setItem('lastViewedAccountData', JSON.stringify(accountData));
    setLastViewedAccountId(getaccountId);

  } catch (error) {
    console.log(error);
    console.log('Error fetching account data');
  }
};

// ... (rest of the code remains the same)

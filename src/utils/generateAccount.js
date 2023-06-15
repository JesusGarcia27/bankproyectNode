const generateAccountNumber = () => {
    let accountNumber = '';
    const minDigits = 6;

    while(accountNumber.length < minDigits){
        accountNumber += Math.floor(Math.random() * 10);
    }

    return accountNumber;
}

module.exports = generateAccountNumber;
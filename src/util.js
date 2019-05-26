const { lovelaceToAdaRate } = require('./config');

const convertTransactionOutputsAmountToAda = (outputAmounts) => {
  let totalAda = 0;

  outputAmounts.forEach((outputAmount) => {
    // Convert output amounts from strings to numbers, then from Lovelaces to ADA
    totalAda += Number(outputAmount);
  })

  return (totalAda / lovelaceToAdaRate);
};

module.exports = { convertTransactionOutputsAmountToAda }

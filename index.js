var cors = require('cors');
const express = require('express');
const app = express();
const port = 3000;
const yahooFinance = require('yahoo-finance');

app.use(cors());

app.get('/', (req, res) => {

  const {fromDate, toDate} = getDates();
  console.log(fromDate, toDate);

  yahooFinance.historical({
    symbol: 'PETR4.SA',
    from: fromDate,
    to: toDate,
    period: 'd'  // 'd' (daily), 'w' (weekly), 'm' (monthly), 'v' (dividends only)
  }, function (err, quotes) {
    res.json(quotes);
  });

});

function getDates() {
  let fromDate = new Date()
  fromDate.setDate(fromDate.getDate()-30);
  fromDate = fromDate.toISOString().slice(0, 10);
  
  // dia atual
  let toDate = new Date().toISOString().slice(0, 10);
  
  return {fromDate, toDate};
}

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
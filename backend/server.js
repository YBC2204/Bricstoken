const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoute = require('./routes/userRoute');
const tokenRoute = require('./routes/tokenRoute');
const stockRoute = require('./routes/stockRoute');
const emailRoute = require('./routes/emailRoute');
const companyRoute = require('./routes/companyRoute');
const CompanyStock = require('./models/CompanyStock');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('BRICS Blockchain Platform API');
});

app.use('/api/users', userRoute);
app.use('/api/token', tokenRoute);
app.use('/api/users', emailRoute);
app.use('/api/stock', stockRoute);
app.use('/api/list', companyRoute);

mongoose.connect('mongodb://127.0.0.1:27017/stellar', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  async function insertCompanyStock(name, publicKey, stocks) {
    try {
        const company = new CompanyStock({
            name: name,
            publicKey: publicKey,
            stocks: stocks
        });

        const savedCompany = await company.save();
        console.log('Company stock data saved:', savedCompany);
    } catch (error) {
        console.error('Error saving company stock data:', error);
    }
}

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
  process.exit(1);
});
// routes/dataChart.js
const express = require('express');
const router = express.Router();
const DataChart = require('../modal/DataChart');

 



// Route to get all data
router.get('/data', async (req, res) => {
  try {
    const data = await DataChart.find();
    if (!data) { // Check the length of the data array
      console.log("No data found for the specified _id.");
      return res.status(404).json({ message: 'No data found' });
    }
    
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' }); 
  }
});


// Define more routes for filtering data based on your variables
// ...

module.exports = router;

// // routes/dataChart.js
// const express = require('express');
// const router = express.Router();
// const DataChart = require('../modal/DataChart');

// // Route to get all data
// router.get('/data', async (req, res) => {
//   try {
//     const data = await DataChart.find();
//     if (!data) { // Check the length of the data array
//       console.log("No data found for the specified _id.");
//       return res.status(404).json({ message: 'No data found' });
//     }

//     res.json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// });

// // Define more routes for filtering data based on your variables
// // ...

// module.exports = router;
// routes/dataChart.js
const express = require("express");
const router = express.Router();
const DataChart = require("../modal/DataChart");

// Route to get all data
router.get("/data", async (req, res) => {
  try {
    const data = await DataChart.find({});
    if (!data) {
      // Check the length of the data array
      console.log("No data found for the specified _id.");
      return res.status(404).json({ message: "No data found" });
    }

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Define more routes for filtering data based on your variables
// ...

router.get("/filterYear", async (req, res) => {
  try {
    const { end_year } = req.query; //construct end_query in req.query object if it presents
    const query = {}; //then makes new object name query
    console.log(end_year);
    if (end_year) {
      query.end_year = end_year; ///and puts client side end_year in a query object
      console.log("Constructed query:", query);
    } else {
      res.json({ message: "NO any end_year passed" });
    }
    const aggregatePipeline = [
      {
        $match: {
          end_year: parseInt(end_year), // Convert to integer if needed
        },
      },
      {
        $project: {
          _id: 0,
          sector: 1,
          topic: 1,
        },
      },
    ];

    const data = await DataChart.aggregate(aggregatePipeline);
    console.log(data);
    if (!data || data.length === 0) {
      console.error("No data found for the specified filter");
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error("Error retrieving data:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/filtertopic", async (req, res) => {
  try {
    const { topic } = req.query;
    console.log(topic);
    const query = {};

    if (topic) {
      query.topic = topic;
      console.log(query);
    } else {
      res.status(401).json({ message: "No topic is found" });
    }
    const data = await DataChart.find(query);
    if (!data || data.length === 0) {
      console.error("No data found for the specified filter");
      return res.status(404).json({ message: "No data found" });
    }
    res.json(data);
  } catch (error) {
    console.error(error.message);
    res.status(401).json({ message: "Error: " + error.message });
  }
});

module.exports = router;

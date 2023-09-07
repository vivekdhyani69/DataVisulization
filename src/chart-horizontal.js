import {Bar} from "react-chartjs-2"
import axios from 'react';
import { useState,useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    
  } from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );




const options = {
    indexAxis: 'x',
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Chart.js Horizontal Bar Chart',
      },
    },
  };


const labels = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
const data = {
labels,
datasets :[
{
  label: 'Dataset1',
data:[1,2,3,4,5,2],
borderColor : 'rgba(255,99,132)',
backgroundColor : 'rgba(255,99,132,0.5)'

},
{
  label: 'Dataset1',
data:[1,2,3,4,5,2],
borderColor : 'rgba(255,99,132)',
backgroundColor : 'rgba(255,99,132,0.5)'

},
]
}

const HorizontalChart = () => {
  const [chartData,setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:3001/api/data');
        const data = res.data; // Use res.data to access the response data
        setChartData(data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
     <Bar data = {data} options = {options}/>
    </div>
  )
}

export default HorizontalChart;

import React, { useEffect, useState } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function App() {
  const [loanAmount, setLoanAmount] = useState(2000000);
  const [interestRate, setInterestRate] = useState(8.75);
  const [tenure, setTenure] = useState(60);
  const [interestAmount, setInterestAmount] = useState(476468);
  const [totalAmount, setTotalAmount] = useState(2476468);

  useEffect(() => {
    if (loanAmount && interestRate && tenure) {
      const monthlyInterestRate = interestRate / (12 * 100);
      const numberOfMonths = tenure;

      const EMI = (loanAmount * monthlyInterestRate * Math.pow((1 + monthlyInterestRate), numberOfMonths)) / (Math.pow((1 + monthlyInterestRate), numberOfMonths) - 1);
      const totalAmountPayable = EMI * numberOfMonths;
      console.log(EMI);
      const totalInterest = totalAmountPayable - loanAmount;

      setInterestAmount(totalInterest.toFixed(2));
      setTotalAmount(totalAmountPayable.toFixed(2));
    }
  }, [loanAmount, interestRate, tenure]);

  const formatNumber = (num) => {
    return num.toString().replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  };

  const doughnutData = {
    labels: ['Principal Amount', 'Interest Amount'],
    datasets: [
      {
        data: [loanAmount, interestAmount],
        backgroundColor: ['#523b7a', '#5f47a7'],  
        hoverBackgroundColor: ['#523b7a', '#5f47a7']
      }
    ]
  };

  const doughnutOptions = {
    cutout: '70%', 
  };

  return (
    <div className='container px-3 '>
      <h2 style={{ color: "white" }} className='text-center mt-5 mb-3'>Calculate Home Loan EMI</h2>
      <div className='emi_box' style={{ background: "white" }}>
        <div className='emi_left'>
          <div className='loan_amount d-grid'>
            <label className='emi_label'>Loan Amount</label>
            <input
              type='number'
              className='emi_input mb-2 mt-1'
              value={loanAmount}
              onChange={(e) => { setLoanAmount(Number(e.target.value)) }}
            />
            <input
              type='range'
              className='mb-2'
              value={loanAmount}
              onChange={(e) => { setLoanAmount(Number(e.target.value)) }}
              min={0}
              max={10000000}
            />
          </div>

          <div className='d-grid'>
            <label className='emi_label'>Illustrative Interest Rate p.a.</label>
            <input
              type='number'
              value={interestRate}
              className='emi_input mb-2 mt-1'
              onChange={(e) => { setInterestRate(Number(e.target.value)) }}
            />
            <input
              type='range'
              className='mb-2'
              value={interestRate}
              onChange={(e) => { setInterestRate(Number(e.target.value)) }}
              min={1}
              max={20}
            />
          </div>

          <div className='d-grid'>
            <label className='emi_label'>Tenure (years)</label>
            <input
              type='number'
              className='emi_input mb-2 mt-1'
              value={tenure}
              onChange={(e) => { setTenure(Number(e.target.value)) }}
            />
            <input
              type='range'
              className='mb-2 emi_range'
              value={tenure}
              onChange={(e) => { setTenure(Number(e.target.value)) }}
              min={60}
              max={360}
            />
          </div>
        </div>

        <div className='emi_right'>
          <div>
            <div>
              <span className='emi_label'>Principal amount</span>
              <p>₹{formatNumber(loanAmount)}</p>
            </div>

            <div>
              <span className='emi_label'>Interest amount</span>
              <p>₹{formatNumber(interestAmount)}</p>
            </div>

            <div>
              <span className='emi_label'>Total amount payable</span>
              <p>₹{formatNumber(totalAmount)}</p>
            </div>
          </div>
          <div className='pie_chart'>
            <Doughnut data={doughnutData} options={doughnutOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

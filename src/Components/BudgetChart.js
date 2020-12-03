import React, { useState } from 'react'
import './BudgetChart.css';
import Budget from "./Budget.json";


export default function BudgetChart() {
    const [clickedspending, setSpending] = useState(0);
    const [clickedincome, setIncome] = useState(0);
    const [clickedmonth, setMonth] = useState(0);
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    //sorting spending according to the month and storing in a new variable
    const spending = Budget.spending.sort((a, b) => {
        if (a.month > b.month) {
            return 1;
        } else {
            return -1;
        }
    });

    //sorting income according to month and storing in new variable 
    const income = Budget.income.sort((a, b) => {
        if (a.month > b.month) {
            return 1;
        } else {
            return -1;
        }
    });

    //show data on click of month
    function showData(index) {
        setSpending(spending[index].spending);
        setIncome(income[index].income);
        setMonth(months[income[index].month - 1]);
        document.getElementsByClassName('spendings')[0].style.display = "flex"
        document.getElementsByClassName('income')[0].style.display = "flex"
    }

    //filtered data to show only spending
    function showSpending(index) {
        setSpending(spending[index].spending);
        setMonth(months[spending[index].month - 1]);
        document.getElementsByClassName('spendings')[0].style.display = "flex"
        document.getElementsByClassName('income')[0].style.display = "none"
    }

    //filtered data to show only income
    function showIncome(index) {
        setIncome(income[index].income);
        setMonth(months[income[index].month - 1]);
        document.getElementsByClassName('income')[0].style.display = "flex"
        document.getElementsByClassName('spendings')[0].style.display = "none"
    }

    return (
        // Main chrat
        <div className="chart">
            {/*Clicked Month Data */}
            <div className="monthdata">
                <h1>{clickedmonth}</h1>
                <div className="data">
                    {/* Spendings of that month */}
                    <div className="spendings">
                        <div className="legend"></div><div><span>spending</span><br />
                            <span className="textdata">${clickedspending}</span></div>
                    </div>
                    {/* Income of that month */}
                    <div className="income">
                        <div className="legend"></div><div><span>income</span><br />
                            <span className="textdata">${clickedincome}</span></div>
                    </div>
                </div>
            </div>

            {/* Showing budget on the chart */}
            <div className="budgettext" style={{ bottom: (Budget.overall_budget / 1.5) }}>
                <div>Budget</div>
                <div className="budgetdata">${Budget.overall_budget}</div>
            </div>
            <div className="overall" budget={Budget.overall_budget} style={{ height: (Budget.overall_budget / 10) + "%" }}></div>
            
            {/* bars showing data */}
            <ul className="bars">

                {
                    spending.map((budget, index) => {
                        if (index < income.length - 1) {
                            return (
                                <li style={{ width: (500 / income.length) }}  >
                                    <div className="bar" style={{ height: (budget.spending / 6), marginLeft: (500 / (income.length * 4)) }} data-percentage={budget.spending} onClick={showSpending.bind(this, index)}></div><span onClick={showData.bind(this, index)}>{months[budget.month - 1]}</span>
                                    <div className="bar1" style={{ height: (income[index].income / 6), marginLeft: (1000 / (income.length * 4)) }} data-percentage={income[index].income} onClick={showIncome.bind(this, index)}></div>
                                </li>
                            )
                        } else {

                            return (
                                <li style={{ width: (500 / income.length) }}  >
                                    <div className="bar" style={{ height: (budget.spending / 6), marginLeft: (500 / (income.length * 4)) }} data-percentage={budget.spending} onClick={showSpending.bind(this, index)}></div><span onClick={showData.bind(this, index)}>{months[budget.month - 1]}</span>
                                    <div className="bar1" style={{ height: (income[index].income / 6), marginLeft: (1000 / (income.length * 4)) }} data-percentage={income[index].income} onClick={showIncome.bind(this, index)}></div>
                                </li>
                            )
                        }
                    })
                }
            </ul>
        </div>
    )
}

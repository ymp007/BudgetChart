import React,{useState} from 'react'
import './BudgetChart.css';
import Budget from "./Budget.json";


export default function BudgetChart() {
    const [clickedspending, setSpending] = useState(0);
    const [clickedincome, setIncome] = useState(0);
    const [clickedmonth, setMonth] = useState(0);
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    function showData(index) {
        setSpending(spending[index].spending);
        setIncome(income[index].income);
        setMonth(months[income[index].month-1]);
        document.getElementsByClassName('spendings')[0].style.display = "flex"
        document.getElementsByClassName('income')[0].style.display = "flex"
    }
    function showSpending(index) {
        setSpending(spending[index].spending);
        setMonth(months[spending[index].month-1]);
        document.getElementsByClassName('spendings')[0].style.display = "flex"
        document.getElementsByClassName('income')[0].style.display = "none"
    }
    function showIncome(index) {
        setIncome(income[index].income);
        setMonth(months[income[index].month-1]);
        document.getElementsByClassName('income')[0].style.display = "flex"
        document.getElementsByClassName('spendings')[0].style.display = "none"
    }
    const spending = Budget.spending.sort((a,b)=> {
        if(a.month>b.month){
            return 1;
        }else{
            return -1;
        }
    });
    const income = Budget.income.sort((a,b)=> {
        if(a.month>b.month){
            return 1;
        }else{
            return -1;
        }
    });

    return (
            <div className="chart">
                <div className="monthdata">
    <h1>{clickedmonth}</h1>
                    <div className="data">
                        <div className="spendings">
                            <div className="legend"></div><div><span>spending</span><br />
                                <span className="textdata">${clickedspending}</span></div>
                        </div>
                        <div className="income">
                            <div className="legend"></div><div><span>income</span><br />
                                <span className="textdata">${clickedincome}</span></div>
                        </div>
                    </div>
                </div>
                <div className="budgettext" style={{ bottom: (Budget.overall_budget / 1.5) }}>
                    <div>Budget</div>
                    <div className="budgetdata">${Budget.overall_budget}</div>
                </div>
                <div className="overall" budget={Budget.overall_budget} style={{ height: (Budget.overall_budget / 10) + "%" }}></div>
                <ul className="bars">

                    {
                        spending.map((budget, index) => {
                            if(index<income.length-1){
                            return (
                                <li style={{ width: (500 / income.length) }}  >
                                    <div className="bar" style={{ height: (budget.spending / 6), marginLeft: (500 / (income.length * 4)) }} data-percentage={budget.spending} onClick={showSpending.bind(this,index)}></div><span onClick={showData.bind(this, index)}>{months[budget.month-1]}</span>
                                    <div className="bar1" style={{ height: (income[index].income / 6), marginLeft: (1000 / (income.length * 4)) }} data-percentage={income[index].income} onClick={showIncome.bind(this,index)}></div>
                                </li>
                            )
                            }else{
                               
                                return (
                                    <li style={{ width: (500 / income.length) }}  >
                                        <div className="bar" style={{ height: (budget.spending / 6), marginLeft: (500 / (income.length * 4)) }} data-percentage={budget.spending} onClick={showSpending.bind(this,index)}></div><span onClick={showData.bind(this,index)}>{months[budget.month-1]}</span>
                                        <div className="bar1" style={{ height: (income[index].income / 6), marginLeft: (1000 / (income.length * 4)) }} data-percentage={income[index].income} onClick={showIncome.bind(this,index)}></div>
                                    </li>
                                )   
                            }
                        })
                    }
                </ul>
            </div>
    )
}

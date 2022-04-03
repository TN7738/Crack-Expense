import React, { useState } from 'react';
import './listingexpense.scss';
import axios from 'axios';

const Listingexpense = (props) => {
    const [expenses, setExpenses] = useState([]);

    React.useEffect( () => {
        axios.get("/api/expense/")
        .then(res => {
            let temp = [];
            res.data.forEach(curr => {
                if(curr.gid === props.groupid){
                    temp.push(curr);
                    return;
                }
            });
            setExpenses(temp);
        })
        .catch(err => {
            setExpenses(null);
        });
    },[]);

    return (
        <div className='expns-wrap'>
            <h4>Expenses</h4>
            <ul>
                {
                    expenses === null || expenses.length === 0 ? <li className='no-exp'>You don't have any expenses yet</li> : expenses.map(expense => <li key={expense._id} className='itm-stl'><a href={'/expense/' + expense._id}><span className='exp-name'>{expense.name}</span><span className='exp-dt'>{String(new Date(expense.date).getMonth() + 1).padStart(2, '0') + '/' + String(new Date(expense.date).getDate()).padStart(2, '0') + '/' + new Date(expense.date).getFullYear()}</span></a></li>)
                }
            </ul>
        </div>
    )
}

export default Listingexpense

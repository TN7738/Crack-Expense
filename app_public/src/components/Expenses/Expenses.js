import React, { useState } from 'react';
import './expenses.scss';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const Expenses = (props) => {
    let history = useHistory();
    const [expenses, setExpenses] = useState([]);

    React.useEffect( () => {
        axios.get("http://localhost:3000/api/expense/")
        .then(res => {
            let temp = [];
            res.data.forEach(curr => {
                if(curr.gid==props.groupid){
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
        <>
            <div className='left-wrap'>
                <h4>Expenses</h4>
                <ul>
                    {
                        expenses.map((expense) => <li key={expense._id}><a href={'/expense/' + expense._id}>{expense.name}{expense.amount}{expense.date}</a></li>)
                    }
                </ul>
            </div>
        </>
    )
}

export default Expenses

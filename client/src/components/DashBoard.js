import React from 'react';
import Feed from './Feed';
import DashHeader from './DashHeader'
import TransactionForm from './TransactionForm';


function DashBoard() {
    return (
        <>
            <DashHeader />
            <h3>Dashboard Content</h3>
            <TransactionForm />
            <Feed/>
        </>
    );
}
export default DashBoard;

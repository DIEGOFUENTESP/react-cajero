import React, { useState } from 'react';
import './ATM.css';
import { showSuccessAlert, showWarningAlert } from './alertFunctions';

const ATM = () => {
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [message, setMessage] = useState('');

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
    }).format(value);
  };

  const withdraw = () => {
    if (amount <= 0) {
      showWarningAlert('Por favor, ingresa una cantidad válida.');
    } else if (amount > balance) {
      showWarningAlert('No tienes suficiente dinero en tu cuenta.');
    } else {
      const newBalance = balance - amount;
      setBalance(newBalance);
      showSuccessAlert(`Retiraste ${formatCurrency(amount)} COP. Saldo restante: ${formatCurrency(newBalance)} COP.`);
      updateTransactions(`Retiraste ${formatCurrency(amount)} COP. Saldo restante: ${formatCurrency(newBalance)} COP.`);
      clearAmount();
    }
  };

  const deposit = () => {
    if (amount <= 0) {
      showWarningAlert('Por favor, ingresa una cantidad válida.');
    } else {
      const newBalance = balance + amount;
      setBalance(newBalance);
      showSuccessAlert(`Depositaste ${formatCurrency(amount)} COP. Saldo actual: ${formatCurrency(newBalance)} COP.`);
      updateTransactions(`Depositaste ${formatCurrency(amount)} COP. Saldo actual: ${formatCurrency(newBalance)} COP.`);
      clearAmount();
    }
  };


  const updateTransactions = (transaction) => {
    setTransactions(prevTransactions => [...prevTransactions, transaction]);
  };

  const clearAmount = () => {
    setAmount(0);
  };

  return (
    <div className="atm-container">
      <h1>Cajero Automático</h1>
      <div>
        <p>Saldo actual: <span className='negrita'>{formatCurrency(balance)} COP</span> </p>
      </div>
      <div>
        <label>Ingrese la cantidad:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value))}
        />
      </div>
      <button onClick={deposit}>Consignar</button>
      <button className="withdraw" onClick={withdraw}>Retirar</button>
      <div>
        <p>{message}</p>
      </div>
      <div>
        <h2>Historial de Transacciones</h2>
        <ul>
          {transactions.map((transaction, index) => (
            <li key={index}>{transaction}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ATM;
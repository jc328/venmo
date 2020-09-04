import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, TextField, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {sendPayment} from '../actions/transactions'

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function TransactionForm(props) {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()

  const handleSubmit = async (e) => {
      e.preventDefault();
      const approved = await dispatch(sendPayment(amount, message, props.userId, props.friendId));
      const newBalance= props.balance-amount
      props.newBalance(newBalance)
      if (approved){
          handleClose()
      }
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const updateAmount = (e) => setAmount(e.target.value)
  const updateMessage = (e) => setMessage(e.target.value)

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <form >
        <p>Current Balance: ${props.balance} </p>
        <TextField
            size="small"
            label="Amount $"
            onChange={updateAmount}
            >
        </TextField>
        <TextField
            size="small"
            label="What's it for?"
            onChange={updateMessage}
            >
        </TextField>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
            Pay user
        </Button>
      </form>
    </div>
  );

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleOpen}>
        Pay user
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
}

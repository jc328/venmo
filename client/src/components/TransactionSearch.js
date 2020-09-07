import React, { useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal, TextField, Button} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {sendPayment, requestPayment} from '../actions/transactions'
import { setBalance } from '../actions/authentication';
// import { faFileExcel } from '@fortawesome/free-solid-svg-icons';
import '../styles/friendslist.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core/styles';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  palette: {
    text: {
      primary: 'rgb(255,255,255)'
    }
  }
})

const modalTheme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    }
  },
  palette: {
    text: {
      primary: 'rgb(0,0,0)'
    }
  }
})

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 300,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(3, 4, 3),
  },
}));

export default function TransactionSearch(props) {

  useEffect(() => {
    setOpen(props.form)
  },[props.form])

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [amount, setAmount] = useState("")
  const [message, setMessage] = useState("")
  const dispatch = useDispatch()

  const handlePay = async (e) => {
      e.preventDefault();
      const approved = await dispatch(sendPayment(amount, message, props.userId, props.friendId));
      const newBalance= props.balance-amount
      props.newBalance(newBalance)
      dispatch(setBalance(newBalance))
      if (approved){
          handleClose()
      }
  }

  const handleRequest = async (e) => {
    e.preventDefault();
    const sent = await dispatch(requestPayment(amount, message, props.userId, props.friendId));
    if (sent){
        handleClose()
    }
}

  // const handleOpen = () => {
  //   setOpen(true);
  // };


  const handleClose = () => {
    setOpen(false);
  };

  const updateAmount = (e) => setAmount(e.target.value)
  const updateMessage = (e) => setMessage(e.target.value)

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <ThemeProvider theme={modalTheme}>
      <form >
        <p> Your Current Balance: ${props.balance} </p>
        <div>
          <TextField
              size="small"
              label="Amount $"
              type="number"
              required
              onChange={updateAmount}
              >
          </TextField>
          <TextField
              size="small"
              label="What's it for?"
              multiline
              onChange={updateMessage}
              >
          </TextField>
        </div>
        <div className="button__holder">
          <Button variant="contained" style={{backgroundColor:"#3D95CE", color:"white"}} onClick={handlePay}>
              Pay
          </Button>
          <Button variant="contained" style={{backgroundColor:"#3D95CE", color:"white"}} onClick={handleRequest}>
              Request
          </Button>
        </div >
        <div className="button__holder">
        <Button variant="contained" color="secondary" onClick={handleClose}>
            Cancel
        </Button>
        </div>
      </form>
      </ThemeProvider>
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
    </ThemeProvider>

  );
}

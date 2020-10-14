import React, {useState, useEffect} from 'react';
import { Button, Badge } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux'
import NotificationsNoneOutlinedIcon from '@material-ui/icons/NotificationsNoneOutlined';
import lightBlue from '@material-ui/core/colors/lightBlue';
import { makeStyles } from '@material-ui/core/styles';
import Popper from '@material-ui/core/Popper';
import Fade from '@material-ui/core/Fade';
import { getRequests, confirmPayment } from '../actions/transactions';
import '../styles/friendslist.css';
import { setBalance } from '../actions/authentication';

const useStyles = makeStyles((theme) => ({
    paper: {
      border: '1px solid',
      borderRadius:'5px',
      padding: theme.spacing(1),
      backgroundColor: theme.palette.background.paper,
    },
  }));

const white = lightBlue[50]


function RequestNotification(props) {
    const dispatch = useDispatch()
    const userId = useSelector((state) => state.authentication.user.id);
    const balance = useSelector((state)=> state.authentication.user.balance);
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const [requests, setRequests] = useState([])

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const handleConfirm = async (transaction_id, amount) => {
        const confirmed = await dispatch(confirmPayment(transaction_id));
        if (confirmed) {
            const newBalance= (balance-amount).toFixed(2)
            dispatch(setBalance(newBalance))
            setRequests(requests.filter((request) => request.id !== transaction_id))
        }
    }

    const open = Boolean(anchorEl);
    const id = open ? 'transitions-popper' : undefined;

    useEffect(() => {
        const awaitRequests = async () => {
            const list = await dispatch(getRequests(userId));
            await setRequests(list.data);
        };
        awaitRequests();
    }, [dispatch, userId]);

    if (requests) {
        return(
            <Button onClick ={handleClick}>
                <Badge
                    badgeContent={requests.length}
                    color="error"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                    <NotificationsNoneOutlinedIcon style={{color: white}}/>
                    <Popper id={id} open={open} anchorEl={anchorEl} transition>
                        {({ TransitionProps }) => (
                        <Fade {...TransitionProps} timeout={350}>
                            <div className={classes.paper}>

                                {requests.length>=1?
                                requests.map((request) => {
                                    return (
                                        <p key={request.id} className="requestlist__holder">{request.payee_name} requests $ {request.amount.toFixed(2)} <span className="payButton"><Button variant="contained" onClick={() => handleConfirm(request.id, request.amount)} size="small" style={{backgroundColor:"#3D95CE", color:"white"}}>Pay</Button></span></p>
                                    )
                                })
                            : <p>You're all caught up!</p>}
                            </div>
                        </Fade>
                        )}
                    </Popper>
                </Badge>
            </Button>
        )
    } else {
        return (
            <Button>
                <Badge
                    badgeContent={0}
                    color="error"
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}>
                    <NotificationsNoneOutlinedIcon onClick ={handleClick} style={{color: white}}/>
                </Badge>
            </Button>
        )
    }
}

export default RequestNotification;

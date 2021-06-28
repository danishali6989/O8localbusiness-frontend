import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme)=>({
    image: {
        backgroundImage: 'url(https://images.unsplash.com/photo-1604778368096-1ef9ada56c0a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjBhbmQlMjBsYXB0b3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height:'100vh'
    },

  root: {
    width: '550px',
    margin:'auto',
    padding:10,
    position:'relative',
    top:'30%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  form: {
    '& > *': {
    //   margin: theme.spacing(2,2,2),
      width: '100%',
    },
  },
  submit:{
    margin: theme.spacing(3, 0, 2),

  }

}));

export  function ForgotPassword() {
  const classes = useStyles();

  const history=useHistory()

  return (
      <div className={classes.image}>
    <Card className={classes.root}>
      <CardContent>
      <Typography  style={{margin:'10px 0px'}}>Forget Password</Typography>

      <form className={classes.form} noValidate autoComplete="off">
      <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            autoComplete="email"
                            autoFocus
                        />
                              <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="User Id"
                            autoComplete="email"
                            autoFocus
                        />

    </form>

    <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={(event) => {
                                event.preventDefault();
                                history.push('/ResetPassword');
                            }}
                        >
                            Reset Password
                        </Button>

          </CardContent>
    </Card>
    </div>
  );
}

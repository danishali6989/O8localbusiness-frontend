import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import { forgotPasswordThunk } from 'generic'
import { useDispatch } from 'react-redux';
import { changePasswordThunk } from 'generic';
import { CircularProgress } from '@material-ui/core';

import { useCustomNotify } from '../../../components'
const useStyles = makeStyles((theme) => ({
  image: {
    backgroundImage: 'url(https://images.unsplash.com/photo-1604778368096-1ef9ada56c0a?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Ym9va3MlMjBhbmQlMjBsYXB0b3B8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  },

  root: {
    width: '550px',
    margin: 'auto',
    padding: 10,
    position: 'relative',
    top: '30%'
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
  submit: {
    margin: theme.spacing(3, 0, 2),

  }

}));


export function ForgotPassword() {
  const classes = useStyles();
  const dispatch = useDispatch()

  const history = useHistory()

  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState('')
  const [showOtp, setShowOtp] = useState('')
  const [showpsw, setShowpsw] = useState(false)
  const [loading, setLoading] = useState(false)

  const CustomNotify = useCustomNotify();

  const [password, setPassword] = useState('')
  const [confrmPaswd, setConfrmPaswd] = useState("")

  const onChangeOtp = (e) => {

    setOtp(e.target.value)


  }

  const forgotpswHanler = async () => {
    setLoading(true)
    const data = {
      email
    }
    
    const request = await dispatch(forgotPasswordThunk({ data }))

    console.log(request)
    if (request.payload) {
      if (request.payload.msg === "OTP send") {

        CustomNotify("OTP sent successfully!", "success")

        setShowOtp(request.payload.otp)

      }

    } else {
      CustomNotify("User not found!", "error")

    }
    setLoading(false)




  }

  // const OtpVerify=()=>{}

  const submitData = async () => {
    setLoading(true)
    if (password === confrmPaswd) {
      const data = {
        otp,
        password,
        email,

      }
      console.log(data)

      const result = await dispatch(changePasswordThunk({ data }))
      console.log("submitData", result)
      history.goBack();
    } else {

      CustomNotify("password mismach", "error")

    }
    setLoading(false)

  }

  const OtpComponent = () => {


    return (
      <>

        {console.log(otp)}
        {/* {console.log(email)} */}
        {/* <Typography>{showOtp}</Typography> */}
    




        <form className={classes.form} noValidate autoComplete="off">
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="otp"
            label="Enter Otp"
            autoComplete={false}
            // name="otp"
            // value={otp}
            onChange={onChangeOtp}
          />
          {
            showpsw === true &&
            <>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="password"
                label="New Password"
                autoComplete="password"
                autoFocus
                onChange={(e) => setPassword(e.target.value)}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Confirm Password"
                autoComplete="email"
                autoFocus
                onChange={(e) => setConfrmPaswd(e.target.value)}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                disabled={loading}
                className={classes.submit}
                onClick={(event) => {
                  event.preventDefault();
                  submitData()
                }}
              >
                {loading ? <CircularProgress size={18} /> : "Submit"}
              </Button>

            </>

          }

        </form>
        {
          showpsw === true ? '' :
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={(event) => {
                event.preventDefault();
                if (parseInt(otp) === parseInt(showOtp)) {
                  console.log(otp.length)
                  setShowpsw(true)

                } else {
                  CustomNotify("OTP Mismach", "error")


                }
              }}
            >
              Verify Otp
                    </Button>



        }


      </>
    )
  }

  return (
    <div className={classes.image}>
      <Card className={classes.root}>
        <CardContent>
          {
            showOtp !== '' ? OtpComponent() :
              <>
                <Typography style={{ margin: '10px 0px' }}>Forget Password</Typography>


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

                    onChange={(e) => setEmail(e.target.value)}
                  />

                </form>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={loading}
                  className={classes.submit}
                  onClick={(event) => {
                    event.preventDefault();
                    forgotpswHanler()
                  }}
                >
                  {loading ? <CircularProgress size={18} /> : 'Send Otp'}
                </Button>
              </>


          }
        </CardContent>
      </Card>
    </div>
  );
}

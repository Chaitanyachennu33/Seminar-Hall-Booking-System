import React, { useState } from 'react';
import "./AdminLogin.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import EmailIcon from '@mui/icons-material/Email';
import HttpsIcon from '@mui/icons-material/Https';
import HomeIcon from '@mui/icons-material/Home';
import { Link, useNavigate } from 'react-router-dom';
import { adminloginApi, adminSignupApi } from '../../api/adminloginapi';
import { addStatus } from '../../store/slices/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function AdminLogin() {
  const [open, setOpen] = useState(false);
  const [isSignup, setIsSignup] = useState(false); // Toggle between login and signup

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password
    };
    if (isSignup) {
      const response = await adminSignupApi(data); // Use the signup API
      if (!response.data.error) {
        dispatch(addStatus("Admin"));
        navigate("/admin/hall");
      } else {
        setOpen(true);
        setPassword('');
      }
    } else {
      const response = await adminloginApi(data);
      if (!response.data.error) {
        dispatch(addStatus("Admin"));
        navigate("/admin/hall");
      } else {
        setOpen(true);
        setPassword('');
      }
    }
  };

  const auth = useSelector((state) => state.user);
  if (auth.status === "Authenticated" && auth.user === 'Admin') {
    navigate("/admin/hall");
  }

  return (
    <>
      <Snackbar vertical='top' horizontal='right' open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert onClose={handleClose} style={{ background: '#990033', color: 'red' }} severity="warning">
          {isSignup ? 'Signup Failed' : 'Incorrect Username/Password'}
        </Alert>
      </Snackbar>

      <div className='admin-login-body'>
        <Grid container spacing={2} style={{ height: '100%' }} alignContent={'center'} justifyContent={'center'}>
          <Grid item xs={11} sm={8} md={7} lg={6} xl={5}>
            <Card sx={{}} className='admin-card'>
              <CardContent>
                <Typography gutterBottom variant="h4" component="div" className='admin-card-title'>
                  {isSignup ? 'SIGN UP' : 'ADMIN LOGIN'}
                </Typography>
              </CardContent>

              <form onSubmit={handleSubmit}>
                <Grid container spacing={4} justifyContent={'center'} alignContent={'center'}>
                  <Grid item xs={11} sm={9} md={8} lg={9} xl={9} justifyItems={'center'}>
                    <FormControl fullWidth>
                      <Input
                        disableUnderline={true}
                        type='email'
                        placeholder="Email"
                        required={true}
                        value={email}
                        className='admin-input'
                        onChange={handleEmail}
                        startAdornment={
                          <InputAdornment position="start" sx={{ marginLeft: '0.5rem' }}>
                            <EmailIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={11} sm={9} md={8} lg={9} xl={9}>
                    <FormControl fullWidth error>
                      <Input
                        type='password'
                        placeholder="Password"
                        required={true}
                        disableUnderline={true}
                        value={password}
                        onChange={handlePassword}
                        className='admin-input'
                        startAdornment={
                          <InputAdornment position="start" sx={{ marginLeft: '0.5rem' }}>
                            <HttpsIcon />
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                  </Grid>

                  <Grid item xs={8} sm={7} md={6} lg={6} xl={5}>
                    <Button size="medium" type='submit' className='btn-login-card' fullWidth>
                      {isSignup ? 'SIGN UP' : 'LOGIN HERE'}
                    </Button>
                  </Grid>

                  <Grid item xs={8} sm={7} md={8} lg={8} xl={8}>
                    <Button size="medium" fullWidth sx={{ color: "#990033" }} className='home-text'>
                      <Link to='/'>
                        <HomeIcon sx={{ marginRight: '0.8rem' }} />
                        HOME
                      </Link>
                    </Button>
                  </Grid>

                  <Grid item xs={8} sm={7} md={8} lg={8} xl={8} style={{ textAlign: 'center' }}>
                    <Button size="small" sx={{ color: '#990033' }} onClick={() => setIsSignup(!isSignup)}>
                      {isSignup ? 'Already have an account? Login here' : 'Don’t have an account? Sign up here'}
                    </Button>
                  </Grid>
                </Grid>
              </form>

              <CardActions></CardActions>
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

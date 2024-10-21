import React, { useState } from 'react';
import './DepartmentLogin.css';
import Card from '@mui/material/Card';
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
import { departmentLoginApi, departmentSignupApi } from "../../api/departmentloginapi"; // Import both APIs
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';

export default function DepartmentLogin() {
    const [open, setOpen] = useState(false);
    const [isSignup, setIsSignup] = useState(false); // State to toggle between login and signup
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [department, setDepartment] = useState(""); // State for department name
    const [errorMessage, setErrorMessage] = useState(""); // State for error message
    const navigate = useNavigate();

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleDepartment = (e) => { // New handler for department input
        setDepartment(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password, department }; // Include department in data

        try {
            let response;

            if (isSignup) {
                response = await departmentSignupApi(data);
            } else {
                response = await departmentLoginApi(data);
            }

            // Check if response and response.data are defined
            if (response&&response.data&&!response.data.error) {
                navigate("/department/booking");
            } else {
                if(isSignup){
                    alert("Signup successful! You can now log in.");
                }
                else{
                setErrorMessage( "Incorrect Username/Password");
                setOpen(true);
                setPassword(''); // Clear password on error
                }
            }
        } catch (error) {
            console.error("API Error:", error);
            setErrorMessage("An error occurred. Please try again.");
            setOpen(true);
            setPassword(''); // Clear password on error
        }
    };

    return (
        <>
            <Snackbar vertical='top' horizontal='right' open={open} autoHideDuration={3000} onClose={handleClose}>
                <Alert onClose={handleClose} style={{ background: '#990033', color: 'red' }} severity="warning">
                    {errorMessage}
                </Alert>
            </Snackbar>

            <div className='department-login-body'>
                <Grid container spacing={2} style={{ height: '100%' }} alignContent={'center'} justifyContent={'center'}>
                    <Grid item xs={11} sm={8} md={7} lg={6} xl={5}>
                        <Card className='department-card'>
                            <CardContent>
                                <Typography gutterBottom variant="h4" component="div" className='department-card-title'>
                                    {isSignup ? "SIGN UP" : "LOGIN"}
                                </Typography>
                            </CardContent>

                            <form onSubmit={handleSubmit}>
                                <Grid container spacing={4} justifyContent={'center'} alignContent={'center'}>
                                    <Grid item xs={11} sm={9} md={8} lg={9} xl={9}>
                                        <FormControl fullWidth>
                                            <Input
                                                value={email}
                                                onChange={handleEmail}
                                                disableUnderline={true}
                                                type='email'
                                                placeholder="Email"
                                                required={true}
                                                className='department-input'
                                                startAdornment={
                                                    <InputAdornment position="start" sx={{ marginLeft: '0.5rem' }}>
                                                        <EmailIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>

                                    <Grid item xs={11} sm={9} md={8} lg={9} xl={9}>
                                        <FormControl fullWidth>
                                            <Input
                                                value={password}
                                                onChange={handlePassword}
                                                type='password'
                                                placeholder="Password"
                                                required={true}
                                                disableUnderline={true}
                                                className='department-input'
                                                startAdornment={
                                                    <InputAdornment position="start" sx={{ marginLeft: '0.5rem' }}>
                                                        <HttpsIcon />
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </Grid>

                                    {isSignup && ( // Conditional rendering for department input
                                        <Grid item xs={11} sm={9} md={8} lg={9} xl={9}>
                                            <FormControl fullWidth>
                                                <Input
                                                    value={department}
                                                    onChange={handleDepartment}
                                                    disableUnderline={true}
                                                    type='text'
                                                    placeholder="Department Name"
                                                    required={true}
                                                    className='department-input'
                                                    startAdornment={
                                                        <InputAdornment position="start" sx={{ marginLeft: '0.5rem' }}>
                                                            <HttpsIcon />
                                                        </InputAdornment>
                                                    }
                                                />
                                            </FormControl>
                                        </Grid>
                                    )}

                                    <Grid item xs={8} sm={7} md={6} lg={6} xl={5}>
                                        <Button size="medium" type='submit' className='btn-department-card' fullWidth>
                                            {isSignup ? "SIGN UP" : "LOGIN HERE"}
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

                                    <Grid item xs={8} sm={7} md={8} lg={8} xl={8}>
                                        <Button size="medium" fullWidth sx={{ color: "#990033" }} className='home-text' onClick={() => setIsSignup(!isSignup)}>
                                            {isSignup ? "Already have an account? Login" : "New user? Sign up"}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        </>
    );
}

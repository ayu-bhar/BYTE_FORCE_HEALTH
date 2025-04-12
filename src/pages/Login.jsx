import React from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../components/styles/login-signup.css';
function Login(props) {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const onsubmit = async (data) => {
        console.log(data);
        try {
            // Send username and password to the backend
            console.log('connecting')
            const response = await axios.post('http://localhost:3000/login', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
               
            });
            console.log("connected");

            // Handle the response
            if (response.data.valid) {
                props.setIsAuthenticated(true);
                localStorage.setItem('user',JSON.stringify(response.data.user));
                console.log(localStorage.getItem('user'));
                navigate('/profile');
                alert('Login successful!');
            } else {
                setError('password', { type: 'manual', message: 'Incorrect Username / Password' });
            }
        } catch (err) {
            console.error('Error during login:', err);
            setError('password', { type: 'manual', message: 'Server error' });
        }
    };

    return (
        <div>
            <div className="login-sign flex-col justify-center items-center h-screen gap-6">
                <h1 className="text-2xl font-bold text-center text-blue-500">Login</h1>
                <span>
                    Don't have an account?{' '}
                    <NavLink to="/signup">
                        <span className="font-bold text-blue-600">Sign up</span>
                    </NavLink>
                </span>
                <div className="ls-container border-2 border-blue-300 bg-white rounded-lg shadow-emerald-400 shadow-lg p-8 w-[40vw] overflow-auto">
                    <form action="" onSubmit={handleSubmit(onsubmit)} className="flex-col gap-1">
                        <label className="ls-lab" htmlFor="userName">
                            Email / User Name
                        </label>
                        <input
                            className="ls-in"
                            type="text"
                            {...register('userName', { required: 'Email / Username is required' })}
                        />
                        {errors.email && <div className="error">{errors.email.message}</div>}

                        <label className="ls-lab" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="ls-in"
                            type="password"
                            {...register('password', {
                                required: 'Password is required',
                                pattern: {
                                    value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/,
                                    message: 'Incorrect Username / Password',
                                },
                            })}
                        />
                        {errors.password && <div className="error">{errors.password.message}</div>}

                        <div className="ls-submit flex justify-center items-center">
                            <input
                                disabled={isSubmitting}
                                className="border-2 w-fit p-3 rounded-xl px-8 py-2 font-bold active:bg-blue-200 active:shadow shadow-blue-500 cursor-pointer"
                                type="submit"
                                value="Submit"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;

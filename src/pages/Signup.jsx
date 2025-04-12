import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../components/styles/login-signup.css';

function Signup() {
    const [formSubmitted, setFormSubmitted] = useState(false); // State to track form submission
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
    } = useForm({
        mode: "onChange", // Enables validation on change
    });

    const checkUsernameExists = async (username) => {
        // console.log("validating username" , username);
        try {
            const response = await axios.get(`http://localhost:3000/check`, {
                params: { username },
            });
            // console.log("Response from server:", response.data);
            return response.data.exists ? "Username already exists" : true;
        } catch (err) {
            console.error("Error checking username:", err);
            return "Unable to validate username";
        }
    };

    const onSubmit = async (data) => {
        try {
            console.log("Form data:", data);
            await axios.post('http://localhost:3000', JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            alert('Data sent successfully!');
        } catch (err) {
            console.error(err);
            alert('Failed to send data');
        }
    };

    const handleFormSubmit = (data) => {
        setFormSubmitted(true); // Set formSubmitted to true when the submit button is clicked
        handleSubmit(onSubmit)(data);
    };

    return (
        <>
            <div className="login-sign flex-col justify-center items-center h-screen gap-6">
                <h1 className="text-2xl font-bold text-center text-blue-500">Sign Up</h1>
                <span>
                    Already have an account?{" "}
                    <NavLink to="/login">
                        <span className="font-bold text-blue-600">Login</span>
                    </NavLink>
                </span>

                <div className="ls-container border-2 border-blue-300 bg-white rounded-lg shadow-emerald-400 shadow-lg p-8 w-[50vw] h-[80vh] overflow-auto">
                    <form action="" onSubmit={handleSubmit(handleFormSubmit)} className="flex-col gap-1">
                        <label htmlFor="Name" className="ls-lab">Full Name</label>
                        <input
                            name="Name"
                            className="ls-in"
                            type="text"
                            {...register("Name", { required: true, pattern: { value: /^[a-zA-Z\s]+$/, message: "Invalid symbol is used in name" } })}
                        />
                        {errors.Name && <div className="error">{errors.Name.message}</div>}

                        <label className="ls-lab" htmlFor="UserName">User Name</label>
                        <input
                            name="UserName"
                            className="ls-in"
                            type="text"
                            {...register("UserName", {
                                required: "User Name is required",
                                pattern: {
                                    value: /^[a-zA-Z0-9_]{3,16}$/,
                                    message: "Invalid symbol is used in username",
                                },
                                validate: async (value) => await checkUsernameExists(value),
                            })}
                        />
                        {errors.UserName && <div className="error">{errors.UserName.message}</div>}

                        <label htmlFor="DateOfBirth" className="ls-lab">Date of Birth</label>
                        <input
                            name="DateOfBirth"
                            className="ls-in"
                            type="date"
                            {...register("DateOfBirth", { required: true })}
                        />
                        {errors.DateOfBirth && <div className="error">{errors.DateOfBirth.message}</div>}

                        <label className="ls-lab" htmlFor="Email">Email</label>
                        <input
                            name="Email"
                            className="ls-in"
                            type="email"
                            {...register("Email", { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Invalid email address" } })}
                        />
                        {errors.Email && <div className="error">{errors.Email.message}</div>}

                        <label className="ls-lab" htmlFor="Password">Password</label>
                        <input
                            name="Password"
                            className="ls-in"
                            type="password"
                            {...register("Password", { required: true, pattern: { value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/, message: "Password must contain at least 8 characters, one letter, one number, and one special character" } })}
                        />
                        {errors.Password && <div className="error">{errors.Password.message}</div>}

                        <label className="ls-lab" htmlFor="City">City</label>
                        <input
                            name="City"
                            className="ls-in"
                            type="text"
                            {...register("City", { required: true, pattern: { value: /^[a-zA-Z\s]+$/, message: "Invalid symbol is used in city" } })}
                        />
                        {errors.City && <div className="error">{errors.City.message}</div>}

                        <label className="ls-lab" htmlFor="Country">Country</label>
                        <input
                            name="Country"
                            className="ls-in"
                            type="text"
                            {...register("Country", { required: true, pattern: { value: /^[a-zA-Z\s]+$/, message: "Invalid symbol is used in country" } })}
                        />
                        {errors.Country && <div className="error">{errors.Country.message}</div>}

                        <label className="ls-lab" htmlFor="Postalcode">Postal Code</label>
                        <input
                            name="Postalcode"
                            className="ls-in"
                            type="text"
                            {...register("Postalcode", { required: true, pattern: { value: /^[0-9]{5}$/, message: "Invalid postal code" } })}
                        />
                        {errors.Postalcode && <div className="error">{errors.Postalcode.message}</div>}

                        <label className="ls-lab" htmlFor="Bloodgroup">Blood Group</label>
                        <select
                            name="Bloodgroup"
                            className="ls-in"
                            {...register("Bloodgroup", { required: true })}
                        >
                            <option value="Don't Know">Select Blood Group</option>
                            <option value="A+">A+</option>
                            <option value="A-">A-</option>
                            <option value="B+">B+</option>
                            <option value="B-">B-</option>
                            <option value="AB+">AB+</option>
                            <option value="AB-">AB-</option>
                            <option value="O+">O+</option>
                            <option value="O-">O-</option>
                            <option value="Don't Know">Don't Know</option>
                        </select>
                        {errors.Bloodgroup && <div className="error">{errors.Bloodgroup.message}</div>}

                        <label htmlFor="Weight" className="ls-lab">Weight (kg)</label>
                        <input
                            name="Weight"
                            className="ls-in"
                            type="number"
                            {...register("Weight", { required: true, pattern: { value: /^[0-9]+$/, message: "Invalid symbol is used in weight" } })}
                        />
                        {errors.Weight && <div className="error">{errors.Weight.message}</div>}

                        <label htmlFor="Height" className="ls-lab">Height (cm)</label>
                        <input
                            name="Height"
                            className="ls-in"
                            type="number"
                            {...register("Height", { required: true, pattern: { value: /^[0-9]+$/, message: "Invalid symbol is used in height" } })}
                        />
                        {errors.Height && <div className="error">{errors.Height.message}</div>}

                        {/* Display message if form is invalid and submit button is clicked */}
                        {formSubmitted && !isValid && (
                            <div className="text-red-500 text-center mt-4">
                                Please fill the required fields.
                            </div>
                        )}

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
        </>
    );
}

export default Signup;

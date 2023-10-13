import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import *as Yup from "yup"

function Register() {


    const [isLoadin, setIsLoading] = useState(false)
    const [apiErr, setApiErr] = useState("")
    const navigate = useNavigate()
    function register(values) {
        setIsLoading(true)
        axios.post(`https://sara7aiti.onrender.com/api/v1/user`, values).then((data) => {
            if (data.data.message === "Added") {
                setIsLoading(false)
                navigate("/login")
            }
        }).catch((err) => {
            setApiErr(err.response.data.error)
            setIsLoading(false)

        })
    }
    const validationSchema = Yup.object({
        name: Yup.string().max(15, "max letter is 15").min(3, "min letter is 3").required("name is required "),
        email: Yup.string().email("invalid email").required("email is required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "password must start with capital letter").required("password is required"),
        cPassword: Yup.string().oneOf([Yup.ref("password")]).required("confirm password is required"),
        age: Yup.number().min(10, "min age is 10").max(60, "max age is 60").required("age is required")
    })
    let formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            cPassword: "",
            age: ""

        },
        validationSchema,
        onSubmit: (values) => { register(values) }
    })

    return (
        <>
            <div class="container text-center my-5 pb-5">
                <div class="user my-3">
                    <i class="far fa-edit user-icon"></i>
                    <h4 class="login">Register</h4>
                </div>
                <div class="card p-5 w-50 m-auto">
                    {apiErr ? <div className='alert alert-danger'>{apiErr}</div> : ""}
                    <form onSubmit={formik.handleSubmit}>
                        <label className='text-left' htmlFor="userName">Name</label>
                        <input id='userName' class="form-control mt-2" onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} type="text" name="name" />
                        {formik.errors.name && formik.touched.name ? <div className="alert alert-danger">{formik.errors.name}</div> : ""}
                        <label htmlFor="email">Email</label>
                        <input id='email' class="form-control my-2" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name="email" />
                        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}
                        <label htmlFor="password">password</label>
                        <input class="form-control my-2" id='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name="password" />
                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}
                        <label htmlFor="cPassword">Confirm Password</label>
                        <input id='cPassword' class="form-control my-2" onBlur={formik.handleBlur} value={formik.values.cPassword} onChange={formik.handleChange} type="password" name="cPassword" />
                        {formik.errors.cPassword && formik.touched.cPassword ? <div className="alert alert-danger">{formik.errors.cPassword}</div> : ""}
                        <label htmlFor="age">Age</label>
                        <input class="form-control my-2" id='age' onBlur={formik.handleBlur} value={formik.values.age} onChange={formik.handleChange} type="number" name="age" />
                        {formik.errors.age && formik.touched.age ? <div className="alert alert-danger">{formik.errors.age}</div> : ""}
                        <button type='submit' class="btn btn-default-outline my-4 w-100 rounded">{isLoadin ? <i class="fa fa-spin fa-spinner"></i> : "Register"}</button>
                        <Link class="btn btn-default-outline" to="/login">Login</Link>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register;
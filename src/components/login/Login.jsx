import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import *as Yup from "yup"
import { tokenContext } from "../../context/tokenContext"
function Login() {
    const [isLoadin, setIsLoading] = useState(false)
    const [apiErr, setApiErr] = useState("")
    const navigate = useNavigate()
    let { setToken } = useContext(tokenContext)
    async function login(values) {
        setIsLoading(true)
        await axios.post("https://sara7aiti.onrender.com/api/v1/user/signin", values).then((response) => {
            if (response?.data?.message === "welcome") {
                console.log(response.data)
                setIsLoading(false)
                localStorage.setItem("token", response.data.token)
                setToken(response.data.token)
                navigate('/profile')
            }
        }).catch((err) => {
            console.log(err.response.data.error)
            setApiErr(err.response.data.error)
            setIsLoading(false)
        })
    }
    const validationSchema = Yup.object({
        email: Yup.string().email("invalid email").required("email is required"),
        password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "password must start with capital letter").required("password is required"),
    })
    let formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema,
        onSubmit: (values) => { login(values) }
    })
    return (
        <>
            <div className="container text-center my-5 pb-5">
                <div className="user my-3">
                    <i className="far fa-edit user-icon"></i>
                    <h4 className="login">Login</h4>
                </div>
                <div className="card p-5 w-50 m-auto">
                    {apiErr ? <div className='alert alert-danger'>{apiErr}</div> : ""}
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email">Email</label>
                        <input id='email' className="form-control my-2" onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} type="email" name="email" />
                        {formik.errors.email && formik.touched.email ? <div className="alert alert-danger">{formik.errors.email}</div> : ""}
                        <label htmlFor="password">password</label>
                        <input className="form-control my-2" id='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange} type="password" name="password" />
                        {formik.errors.password && formik.touched.password ? <div className="alert alert-danger">{formik.errors.password}</div> : ""}
                        <button type='submit' className="btn btn-default-outline my-4 w-100 rounded">{isLoadin ? <i className="fa fa-spin fa-spinner"></i> : "Login"}</button>
                        <Link className="btn btn-default-outline" to="/register">Register</Link>
                    </form>
                </div>
            </div>
        </>
    )
}
export default Login;
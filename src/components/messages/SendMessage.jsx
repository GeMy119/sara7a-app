import React from 'react';
import avatar from "../../img/avatar.png"
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import *as Yup from "yup"

export default function SendMessage() {
    let params = useParams()
    async function send(values) {
        let data = {
            ...values,
            receivedId: params.userId
        }
        await axios.post("https://sara7aiti.onrender.com/api/v1/message", data).then((response) => {
            if (response?.data?.messaged === "Added") {
                console.log(response.data.messaged)
                window.alert("message send")
                formik.resetForm()
            }
        }).catch((err) => {
            console.log(err)
        })

    }
    const validationSchema = Yup.object({
        messageContent: Yup.string().required("message is required"),
    })
    let formik = useFormik({
        initialValues: {
            messageContent: "",
        },
        validationSchema,
        onSubmit: (values) => { send(values) }
    })
    return (
        <>
            <div className="container text-center py-5 my-5 text-center">
                <div className="card py-5 mb-5">
                    <a href="" data-toggle="modal" data-target="#profile">
                        <img src={avatar} className="avatar" alt="" />
                    </a>
                    <h3 className="py-2">Nourhan Saeed</h3>
                    <div className="container w-50 m-auto">
                        <form onSubmit={formik.handleSubmit}>
                            <textarea onBlur={formik.handleBlur} value={formik.values.messageContent} onChange={formik.handleChange} className="form-control" name="messageContent" cols="10" rows="9" placeholder="You cannot send a Sarahah to yourself, share your profile with your friends :)"></textarea>
                            {formik.errors.messageContent && formik.touched.messageContent ? <div className="alert alert-danger">{formik.errors.messageContent}</div> : ""}
                            <button type='submit' className="btn btn-outline-info mt-3"><i className="far fa-paper-plane"></i> Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgotPassword } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');

    const dispatch = useDispatch();

    const { error, message, loading } = useSelector(state => state.forgotPassword)

    useEffect(() => {
        if (error) {
            console.log(error);
        }

        if (message) {
            console.log(message);
        }

    }, [dispatch, error, message])

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('email', email)

        dispatch(forgotPassword(formData));
    }

    return (
        <Fragment>
            <MetaData title="Forgot Password" />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">Forgot Password</h1>
                        <div className="form-group">
                            <label htmlFor="email_field">Enter Email</label>
                            <input type="email" id="email_field" className="form-control" value={email} onChange={e => { setEmail(e.target.value) }} />
                        </div>

                        <button id="forgot_password_button" type="submit" className="btn btn-block py-3" disabled={loading ? true : false}>
                            Send Email
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default ForgotPassword

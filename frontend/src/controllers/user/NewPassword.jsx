import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';

const NewPassword = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useParams();

    const { error, success, loading} = useSelector(state => state.forgotPassword);

    useEffect(() => {
        if (error) {
            console.log(error);
        }

        if (success) {
            console.log('Password Changed Successfully');
            navigate('/login');
        }

    }, [dispatch, error, success, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('password', password);
        formData.set('confirmPassword', confirmPassword);

        dispatch(resetPassword(token, formData))
    }

    return (
        <Fragment>
            <MetaData title={'New Password'} />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h1 className="mb-3">New Password</h1>
                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input type="password" id="password_field" className="form-control" value={password} onChange={e => {setPassword(e.target.value) }} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm_password_field">Confirm Password</label>
                            <input type="password" id="confirm_password_field" className="form-control" value={confirmPassword} onChange={e => {setConfirmPassword(e.target.value)}} />
                        </div>
                        <button id="new_password_button" type="submit" className="btn btn-block py-3" disabled={loading ? true : false}>
                            Set Password
                        </button>

                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default NewPassword

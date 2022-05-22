import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { register } from '../../actions/userActions';
import MetaData from '../layouts/MetaData';


const Register = () => {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [avatar, setAvatar] = useState('')
    const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { loading, isAuthenticated, error } = useSelector(state => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/');
        }

    }, [dispatch, isAuthenticated, error, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.set('name', name);
        formData.set('email', email);
        formData.set('password', password);
        formData.set('avatar', avatar);

        dispatch(register(formData))
    }

    const onChange = (e) => {
        if(e.target.name === 'avatar') {
            const reader = new FileReader();

            reader.onload = () => {
                if(reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            }

            reader.readAsDataURL(e.target.files[0]);
        }
    }


    return (
        <Fragment>
            <MetaData title="Register User" />
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler} encType='multipart/form-data'>
                        <h1 className="mb-3">Register</h1>

                        <div className="form-group">
                            <label htmlFor="name_field">Name</label>
                            <input type="text" id="name_field" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email_field">Email</label>
                            <input type="email" id="email_field" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password_field">Password</label>
                            <input type="password" id="password_field" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>

                        <div className='form-group'>
                            <label htmlFor='avatar_upload'>Avatar</label>
                            <div className='d-flex align-items-center'>
                                <div>
                                    <figure className='avatar mr-3 item-rtl'>
                                        <img src={avatarPreview} className='rounded-circle' alt='avatar Preview' />
                                    </figure>
                                </div>
                                <div className='custom-file'>
                                    <input type='file' name='avatar' className='custom-file-input' id='customFile' accept='images/*' onChange={onChange} />
                                    <label className='custom-file-label' htmlFor='customFile'>
                                        Choose Avatar
                                    </label>
                                </div>
                            </div>
                        </div>

                        <button id="register_button" type="submit" className="btn btn-block py-3" disabled={loading ? true : false}>
                            REGISTER
                        </button>
                    </form>
                </div>
            </div>
        </Fragment>
    )
}

export default Register

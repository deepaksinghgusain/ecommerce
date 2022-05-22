import React, {  useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { loadUser } from '../../actions/userActions';
import Loader from '../layouts/Loader';

const ProtectedRoutes = ({children, isAdmin }) => {

    const dispatch = useDispatch();
    
    const { isAuthenticated = false , loading = true, user} = useSelector((state) => state.auth);
    
    useEffect(() => {
        if(!user) {
            dispatch(loadUser());
        }
    }, [dispatch,isAuthenticated, loading,user])
    
    if(loading) return <Loader />;

    if(!loading && isAuthenticated) {
        if(isAdmin === true && user.role !== 'admin') {
            return <Navigate to="/" />
        }

        return children;
    }else {
        return <Navigate to="/login" />
    }
}

export default ProtectedRoutes

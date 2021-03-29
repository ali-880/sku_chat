import { Button, makeStyles, TextField, Typography } from '@material-ui/core'
import React from 'react'
import AppbarPage from './../component/Appbar';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'react-redux';
import { handleLogin } from './../../redux/action/user/index';
import { ToastContainer } from 'react-toastify';
import { withRouter } from 'react-router-dom';
const validator=yup.object({
    password:yup.string().min(6,'تعداد کاراکتر برای رمز عبور باید بیشتر از شش  تا باشد').max(20,'تعداد کاراکتر بیش تر از حد مجاز است').required('وارد کردن این فیلد الزامی است'),
    studentNumber:yup.string().min(9,'شماره دانشجویی باید دارای 9 کاراکتر باشد').max(9,'شماره دانشجویی باید دارای 9 کاراکتر باشد').required('وارد کردن این فیلد الزامی است'),  
  })
const useStyle = makeStyles((theme) => {
    return {
        root: {
            width: '35%',
            [theme.breakpoints.down('xs')]: {
                width: '80%'
            },
            [theme.breakpoints.only('sm')]: {
                width: '60%'
            },
            [theme.breakpoints.only('md')]: {
                width: '50%'
            },
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 90
        },
        txt: {
            fontWeight: 'bold'
        },
        small: {
            fontSize: 14,
            color: '#546e7a',
            fontFamily: 'BYekan',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            marginTop: 45
        },
        input: {
            marginTop:30
        },
        btn: {
            padding: 10,
            fontSize: 18,
            marginTop:25
        }
    }
})
const Login = (props) => {
    const classes = useStyle()
    const dispatch=useDispatch()
    return (
        <div>
            <AppbarPage />
            <div className={classes.root}>
                <Typography variant='h5'>ورود به سامانه چت دانشگاه</Typography>
                <p className={classes.small}>نام کاربری شما برابر با شماره دانشجویی شما در سامانه سس می باشد </p>
                <Formik
                    validationSchema={validator}
                    initialValues={{ studentNumber: '', password: '' }}
                    onSubmit={(values) => {
                        dispatch(handleLogin(values,props.history.replace))
                    }}
                >
                    {({handleChange,values,errors,handleBlur,touched,handleSubmit}) => (
                        <div className={classes.form}>
                            <TextField onChange={handleChange('studentNumber')} onBlur={handleBlur('studentNumber')} value={values.studentNumber} className={classes.input} variant='outlined' label='نام کاربری' />
                            {errors.studentNumber  && touched.studentNumber?(<i style={{fontFamily:'BYekan',color:'#ff3f34',fontStyle:'italic'}}>{errors.studentNumber}</i>):null}
                            <TextField onBlur={handleBlur('password')} onChange={handleChange('password')} value={values.password} className={classes.input} variant='outlined' label='رمز عبور' />
                            {errors.password  && touched.password?(<i style={{fontFamily:'BYekan',color:'#ff3f34'}}>{errors.password}</i>):null}                    
                            <Button onClick={handleSubmit} className={classes.btn} variant='contained' color='primary'>ورود کاربر</Button>
                        </div>
                    )}
                </Formik>
            </div>
            <ToastContainer/>
        </div>
    );
}

export default withRouter(Login);
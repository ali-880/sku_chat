import { Button, Container, makeStyles, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import AppbarPage from './../component/Appbar';
import Card from './../../components/Card/Card';
import CardHeader from './../../components/Card/CardHeader';
import CardBody from './../../components/Card/CardBody';
import { useDispatch, useSelector } from 'react-redux';
import { handleUserGetLessons } from 'redux/action/user';
import { Store } from './../../redux/store/index';
import { ToastContainer } from 'react-toastify';
import { NavLink } from 'react-router-dom';
const useStyle = makeStyles((theme) => {
    return {
        root: {

        },
        txt: {
            marginBottom: 10
        },
        divImg: {
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            marginTop:35,
            marginBottom:60
        },
        img:{
            width:'100%',
            height:500
        }
    }
})
const Home = () => {
    const classes = useStyle()
    const dispatch = useDispatch();
    useEffect(() => {
        if (!Store.getState().Course.lenght) {
            dispatch(handleUserGetLessons())
        }
    }, [])
    const courses = useSelector(state => state.Course)
    let i = 1
    return (
        <div>
            <AppbarPage />

            <Container>
                <Card style={{marginTop:50,marginBottom:100}}>
                    <CardHeader color='primary'>
                        <Typography variant='h5' className={classes.txt}>لیست دروس  شما در ترم جاری</Typography>
                        <Typography variant='subtitle1'>شما می توانید لیست دروس خود را از قسمت زیر مشاهده کنید و به صفحه ی چت هر کدام از درس هایی که مایل هستید وارد شوید</Typography>
                    </CardHeader>
                    <CardBody>
                        <Table style={{overflowX:'scroll'}}> 
                            <TableHead>
                                <TableRow>
                                    <TableCell align='center'>ردیف</TableCell>
                                    <TableCell align='center'>نام درس</TableCell>
                                    <TableCell align='center'>استاد درس</TableCell>
                                    <TableCell align='center'>ورود به کلاس</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {courses.map((item) => (
                                    <TableRow key={item._id}>
                                        <TableCell align='center'>{i++}</TableCell>
                                        <TableCell align='center'>{item.name}</TableCell>
                                        <TableCell align='center'>{item.teacher.name}</TableCell>
                                        <TableCell align='center'><NavLink to={`/chatPage/${item._id}`}><Button variant='contained' color='primary'>ورود به کلاس</Button></NavLink></TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                    </CardBody>
                </Card>
            </Container>
            <ToastContainer/>
        </div>
    );
}
export default Home;
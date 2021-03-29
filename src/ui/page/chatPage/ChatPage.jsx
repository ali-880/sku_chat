import { Avatar, Button, Divider, Fade, Grid, Hidden, IconButton, InputLabel, List, ListItem, ListItemAvatar, ListItemText, makeStyles, Paper, TextField, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { handleGetLessonForChatPage } from './../../../redux/action/chatPage/index';
import SendIcon from '@material-ui/icons/Send';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import io from 'socket.io-client'
import moment from 'jalali-moment'
import { Store } from './../../../redux/store/index';
import { toast, ToastContainer } from 'react-toastify';
import CostumeModal from './component/modal';
import axios from 'axios';
import { configUrl } from './../../../config/Url';
const useStyle = makeStyles((theme) => {
    return {
        usersPaper: {
            borderRadius: 10,
            padding: 15,
            height: '85vh',
            overflowY: 'scroll'
        },
        root: {
            width: '95%',
            marginRight: 'auto',
            marginLeft: 'auto',
            marginTop: 20,
        },
        title: {
            textAlign: 'center',
            marginBottom: 5
        },
        divider: {
            backgroundColor: 'black'
        },
        rootList: {
            width: '100%',
            backgroundColor: theme.palette.background.paper,
        },
        chatMain: {
            marginRight: 'auto',
            marginLeft: 'auto'
        },
        header: {
            width: '100%',
            padding: 10,
            backgroundColor: '#34ace0',
            borderRadius: 10
        },
        paperBody: {
            padding: 10,
            height: '60vh',
            borderRadius: 13,
            width: '100%',
            overflowY: 'scroll',
            marginTop: 15
        },
        footer: {
            marginTop: 20,
            display: 'flex',
            flexDirection: 'row',
        },
        avatar: {
            backgroundColor: '#d1ccc0',
            color: 'black',
        },
        file: {
            wordBreak: 'break-all',
            textOverflow: 'clip',
            whiteSpace: 'normal',
            width: 'max-content',
            maxWidth: '70%',
            marginBottom: 20,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start'

        },
        fileBody: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#bdc3c7',
            borderRadius: 6,
            padding: 15
        },
        fileLink: {
            marginTop: 5,
            display: 'flex',
            flexDirection: 'row',
            textDecoration: 'none',
            color: 'black'
        },
        otherMessage: {
            marginLeft: 20,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }
})
const ChatPage = (props) => {
    const socket = useRef(useMemo(() => {
        return io.connect('http://localhost:4000/socket', { transports: ['websocket'] })
    }, []))
    const [message, setMessage] = useState('')
    const [File, setFile] = useState('')
    const [open, setOpen] = React.useState(false);
    const dispatch = useDispatch()
    const classes = useStyle()
    useEffect(() => {
        dispatch(handleGetLessonForChatPage(props.match.params.id, props.history.replace))
        socket.current.emit('joinToChat', { id: props.match.params.id, student: Store.getState().User._id })
        socket.current.on('setOnline', async (data) => {
            const new_data = [...Store.getState().UserChatPage];
            const findIndex = new_data.findIndex((item) => item._id === data)
            console.log(findIndex)
            const user = new_data[findIndex];
            console.log(user)
            user.online = true;
            new_data[findIndex] = user;
            await dispatch({ type: 'usersOnline', payload: [...new_data] });
        })
        socket.current.on('setOfline', async (data) => {
            const new_data = [...Store.getState().UserChatPage];
            const findIndex = new_data.findIndex((item) => item._id === data)
            const user = new_data[findIndex];
            user.online = false;
            new_data[findIndex] = user;
            await dispatch({ type: 'usersOfline', payload: [...new_data] });
        })
        socket.current.on('handleTextMessage', (data) => {
            Store.dispatch({ type: 'newMsg', payload: [...Store.getState().msgChatPage, data] })
        })
        socket.current.on('handleDelete', async (data) => {
            const msg = [...Store.getState().msgChatPage];
            const new_data = msg.filter((item) => item._id !== data);
            await Store.dispatch({ type: 'DeleteMsg', payload: [...new_data] })
        })
        return () => {
            socket.current.emit('offline', { id: props.match.params.id, user: Store.getState().User._id })
            socket.current.disconnect()

        }
    }, [])
    const users = useSelector(state => state.UserChatPage)
    const msg = useSelector(state => state.msgChatPage)
    const lesson = useSelector(state => state.LssonsChatPage)
    const teacher = useSelector(state => state.Teacher)
    const user = useSelector(state => state.User)
    const handleTextMessage = () => {
        if (message !== '') {
            const New_message = {
                sender: user._id,
                name: user.name,
                type: 'text',
                text: message,
                image: user.image,
                time: moment().locale('fa').format('hh:mm:ss__YYYY/MM/D')
            }
            socket.current.emit('handleTextMessage', { message: New_message, id: props.match.params.id })
            setMessage('')
        } else {
            toast.warning('پیام خالی فرستاده نمی شود', { position: 'top-right' })
        }
    }
    const handleDelete = (data) => {
        socket.current.emit('handleDelete', { lesson: props.match.params.id, msg_id: data })
    }
    const handleSendFile = async () => {
        if (File) {
            try {
                const data = new FormData();
                data.append('file', File);
                const result = await axios.post(`${configUrl.url}user/file`, data)
                const message_data = {
                    sender: user._id,
                    name: user.name,
                    type: 'file',
                    text: result.data.text,
                    image: user.image,
                    time: moment().locale('fa').format('hh:mm:ss__YYYY/MM/D'),
                    fileName: result.data.fileName
                }
                socket.current.emit('handleSendFile', { lesson: lesson._id, message: message_data })
                setOpen(false)
            } catch (e) {
                console.log(e)
                toast.error('مشکلی پیش امده است عزیز دل چند لحضه ی دیگر دوباره تلاش کنید')
                setOpen(false)
            }
        } else {
            toast.warning('باید فایلی را برای ارسال انتخاب کنید', { position: 'top-right' })
        }
    }
    return (
        <div>
            <Grid container direction='row' spacing={5} className={classes.root}>
                <Hidden smDown>
                    <Grid item lg={3} xl={3} md={4}>
                        <Paper elevation={3} className={classes.usersPaper}>
                            <Typography variant='h6' className={classes.title}>کلاس : {lesson.name}</Typography>
                            <Typography variant='subtitle2' style={{ marginBottom: 10 }}>استاد درس :{teacher.name}</Typography>
                            <Divider className={classes.divider} />
                            <List className={classes.rootList}>
                                {users.map((item) => (
                                    <div key={item._id}>
                                        <ListItem key={item._id} alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar alt="Remy Sharp" src={`${configUrl.img}user/${item.image}`} />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={item.name}
                                                secondary={
                                                    <div>
                                                        <Typography
                                                            variant="subtitle2"
                                                            style={{ display: 'inline' }}
                                                        >
                                                            دانشجو
                                                    </Typography>
                                                    </div>
                                                }
                                            />
                                            <small style={{ marginTop: 15, color: '#95a5a6' }}>{item.online === true ? 'انلاین' : null}</small>
                                        </ListItem>
                                        <Divider />
                                    </div>
                                ))}
                            </List>
                        </Paper>
                    </Grid>
                </Hidden>
                <Grid item lg={9} sm={12} xs={12} md={8} xl={9} className={classes.chatMain}>
                    <div className={classes.header}>
                        <Typography variant='h6'>{lesson.name}</Typography>
                        <Typography variant='subtitle2' style={{ fontFamily: 'BYekan', marginTop: 5 }}>تعداد دانشجویان کلاس : {users.length} نفر</Typography >
                    </div>
                    <div className={classes.body}>
                        <Paper elevation={3} className={classes.paperBody}>
                            {msg.map((item) => (
                                <div>
                                    {item.sender === user._id ? item.type === 'file' ? (
                                        <div className={classes.file}>
                                            <div className={classes.fileBody}>
                                                <a href={`${configUrl.img}/file/${item.text}`} className={classes.fileLink}>
                                                    <ArrowDownwardIcon />
                                                    <Typography style={{ marginRight: 10 }} variant='subtitle1'>{item.fileName}</Typography>
                                                </a>
                                                <IconButton onClick={() => { handleDelete(item._id) }} style={{ marginRight: 15 }}>
                                                    <DeleteIcon fontSize='small' />
                                                </IconButton>
                                            </div>
                                            <i style={{ fontStyle: 'italic', marginTop: 3 }}>{item.time}</i>
                                        </div>
                                    ) : (
                                        <div className={classes.file}>
                                            <div className={classes.fileBody}>
                                                <Typography style={{ marginTop: 5 }} variant='subtitle1'>
                                                    {item.text}
                                                </Typography>
                                                <IconButton onClick={() => { handleDelete(item._id) }} style={{ marginRight: 15 }}>
                                                    <DeleteIcon fontSize='small' />
                                                </IconButton>
                                            </div>
                                            <i style={{ fontStyle: 'italic', marginTop: 3 }}>{item.time}</i>
                                        </div>
                                    ) : item.type === 'file' ? (
                                        <div key={item._id} className={classes.otherMessage}>
                                            <div style={{ width: 'max-content', marginBottom: 25 }}>
                                                <i style={{ fontSize: 13 }}>{item.name}</i>
                                                <div style={{ marginTop: 5, backgroundColor: '#686de0', borderRadius: 6, padding: 15 }}>
                                                    <a href={`${configUrl.img}/file/${item.text}`} className={classes.fileLink}>
                                                        <ArrowDownwardIcon />
                                                        <Typography style={{ marginRight: 10 }} variant='subtitle1'>{item.fileName}</Typography>
                                                    </a>
                                                </div>
                                                <i style={{ fontStyle: 'italic', marginLeft: 'auto', marginTop: 5 }}>{item.time}</i>
                                            </div>
                                            <Avatar style={{ marginRight: 15, marginTop: 30 }} src={`http://localhost:4000/user/${item.image}`} />
                                        </div>
                                    ) : (
                                        <div key={item._id} className={classes.otherMessage}>
                                            <div style={{ width: 'max-content', marginBottom: 25 }}>
                                                <i style={{ fontSize: 13 }}>{item.name}</i>
                                                <div style={{ marginTop: 5, backgroundColor: '#686de0', borderRadius: 6, padding: 15 }}>
                                                    <Typography variant='subtitle1'>{item.text}</Typography>

                                                </div>
                                                <i style={{ fontStyle: 'italic', marginLeft: 'auto', marginTop: 5 }}>{item.time}</i>
                                            </div>
                                            <Avatar style={{ marginRight: 15, marginTop: 30 }} src={`http://localhost:4000/user/${item.image}`} />
                                        </div>
                                    )}
                                </div>
                            ))}
                        </Paper>
                    </div>
                    <div className={classes.footer}>
                        <TextField value={message} onChange={(event) => { setMessage(event.target.value) }} variant='outlined' label='پیام ....' style={{ backgroundColor: 'white', width: '80%' }} />
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Button onClick={handleTextMessage} style={{ marginRight: 10 }}><Avatar className={classes.avatar}><SendIcon /></Avatar></Button>
                            <Button onClick={() => { setOpen(true) }} style={{ marginRight: 10 }}><Avatar className={classes.avatar}><AttachFileIcon /></Avatar></Button>
                        </div>
                    </div>
                </Grid>
            </Grid>
            <CostumeModal open={open} setOpen={setOpen}>
                <Fade in={open}>
                    <div className={classes.paper}>
                        <Typography variant='h6' style={{ textAlign: 'center', marginBottom: 20 }}>
                            انتخاب فایل
                        </Typography>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <InputLabel style={{ fontFamily: 'BYekan', marginBottom: 20 }}>فایل خود را انتخاب کنید</InputLabel>
                            <TextField onChange={(event) => { setFile(event.target.files[0]) }} style={{ marginBottom: 20 }} variant='outlined' type='file' />
                            <Button onClick={handleSendFile} variant='contained' color='primary'>ارسال فایل</Button>
                        </div>
                    </div>
                </Fade>
            </CostumeModal>
            <ToastContainer />
        </div>
    );
}

export default withRouter(ChatPage);
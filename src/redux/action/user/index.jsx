import axios from "axios"
import { configUrl } from "config/Url"
import { toast } from 'react-toastify';

export const handleGetUserForAdmin = (data) => {
    return async (dispatch, getstate) => {
        try {
            const result = await axios.post(`${configUrl.url}admin/user/show`, data, {
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            await dispatch({ type: 'handleGetUserForAdmin', payload: [...result.data] })
        } catch (e) {
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            } else if (e.response.status === 403) {
                toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
            } else if (e.response.status === 401) {
                toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
            }
        }
    }
}
export const handleDeleteUser = (id) => {
    return async (dispatch, getstate) => {
        try {
            await axios.delete(`${configUrl.url}user/${id}`,{
                headers: {
                    'Authorization': localStorage.getItem('token')
                }
            });
            const user = [...getstate().AdminUsers];
            const new_data = user.filter((item) => item._id !== id);
            await dispatch({ type: 'handleDeleteUser', payload: [...new_data] })
        } catch (e) {
            if (e.response.status === 500) {
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            } else if (e.response.status === 403) {
                toast.warning('با اطلاعات هویتی شما این عمل مجاز نمی باشد', { position: 'top-right' })
            } else if (e.response.status === 401) {
                toast.warning('برای انجام این درخواست لطفا ابتدا در سامانه ثبت نام کنید', { position: 'top-right' })
            }
        }
    }
}
export const handleLogin=(data,replace)=>{
    return async(dispatch,getstate)=>{
        try{
            const user=await axios.post(`${configUrl.url}login`,data);
            await dispatch({type:'Login',payload:{...user.data}})
            localStorage.setItem('token',user.data.token)
            replace('/')
            toast.success(`دانشجوی گرامی ${user.data.name} ${user.data.lastName} امیدوارم حال دلت خوب باشه شما به سامانه چت دانشگاه شهرکرد وارد شدی`,{position:'top-right',style:{width:440,padding:20}})
        }catch(e){
            if(e.response.status===500){
                toast.error('مشکلی از سمت سرور پیش امده لطفا مجددا تلاش کنید', { position: 'top-right' })
            }else if(e.response.status===404){
                toast.error('مشکلی در مشخصات وارد شده از سمت شما می باشد لطفا بیشتر تلاش کنید',{position:'top-right'})
            }
        }
        
    }
}
export const handleUserGetLessons=()=>{
    return async(dispatch,getstate)=>{
        try{
            const result=await axios.get(`${configUrl.url}user/student/lessons`,{headers:{
                'Authorization':localStorage.getItem('token')
            }})
            await dispatch({type:'handleUserGetLessons',payload:[...result.data]})
        }catch(e){
            console.log(e)
        }
    }
}
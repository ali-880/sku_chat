import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router';
import Admin from './../layouts/Admin';
import UserProfile from './../views/UserProfile/UserProfile';
import Dashboard from './../views/Dashboard/Dashboard';
import CreateCourse from './../views/Courses/Create';
import ShowCourse from './../views/Courses/Show';
import SelectLesson from './../views/SelectLesson/index';
import User from '../views/UserProfile/User'
import lodash from 'lodash'
import { useSelector } from 'react-redux';
import Login from './../ui/page/Login';
import Home from './../ui/page/Home';
import ChatPage from './../ui/page/chatPage/ChatPage';
import { Store } from 'redux/store';
const App = () => {
    const user=useSelector(state=>state.User);
    console.log(lodash(user).isEmpty())
    if(lodash(user  ).isEmpty()){
        console.log('object')
    }
    
    return ( 
        <Switch>
            <Route path={['/admin','/admin/user/create','/admin/course/create','/admin/student/show','/admin/selectLesson']}>
              <Admin>
                <Route exact path='/admin/user/create' render={()=>(lodash(user).isEmpty()?(<Redirect to='/'/>):user.role=='admin'?(<UserProfile/>):(<Redirect to='/'/>))}/>
                <Route exact path='/admin' render={()=>(lodash(user).isEmpty()?(<Redirect to='/'/>):user.role=='admin'?(<Dashboard/>):(<Redirect to='/'/>))}/>
                <Route exact path='/admin/course/create' render={()=>(lodash(user).isEmpty()?(<Redirect to='/'/>):user.role==='admin'?(<CreateCourse/>):(<Redirect to='/'/>))}/>
                <Route exact path='/admin/student/show' render={()=>(lodash(user).isEmpty()?(<Redirect to='/'/>):user.role==='admin'?(<User/>):(<Redirect to='/'/>))}/>
                <Route exact path='/admin/course/show' render={()=>(lodash(user).isEmpty()?(<Redirect to='/'/>):user.role==='admin'?(<ShowCourse/>):(<Redirect to='/'/>))}/>
                <Route exact path='/admin/selectLesson' render={()=>(lodash(user).isEmpty()?(<Redirect to='/'/>):user.role==='admin'?(<SelectLesson/>):(<Redirect to='/'/>))}/>
              </Admin>
            </Route>
            <Route exact path={['/login','/','/chatpage/:id']}>
              <Route exact path='/login' component={Login}/>
              <Route exact path='/' component={Home}/>
              <Route exact path='/chatpage/:id' component={ChatPage}/>
            </Route>
          </Switch>
    );
}
 
export default App;
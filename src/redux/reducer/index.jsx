import { combineReducers } from "redux";
import { Group } from './Group/index';
import { SuperAdminShowUser } from './User/SuperAdminShowUser';
import { SuperAdminCourseShow } from './course/SuperAdminCourseShow';
import { StudentCourses } from './Student/index';
import { User } from './User/index';
import { Course } from './course/index';
import { msgChatPage } from './chatPage/msgChatPage';
import { UserChatPage } from './chatPage/UsersChatPage';
import { LssonsChatPage } from './chatPage/LessonsChatPage';
import { Teacher } from './chatPage/Teacher';

export const ComReducer=combineReducers({
    Group,
    AdminCourses:SuperAdminCourseShow,
    AdminUsers:SuperAdminShowUser,
    StudentCourses,
    User,
    Course,
    msgChatPage,
    UserChatPage,
    LssonsChatPage,
    Teacher
})
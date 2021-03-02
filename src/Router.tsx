import React from 'react';
import {
    Route,
    Switch
} from 'react-router-dom';
import {
    ScheduleList,
    Page404,
    Options,
    ScheduleEdit,
    ScheduleRegister,
    ScheduleDetail,
    Calender
} from '@/templates';

const Router: React.FC = () => {
    return (
        <Switch>
            <Route exact path="/" component={ScheduleList}/>
            <Route exact path="/schedules/register" component={ScheduleRegister}/>
            <Route exact path="/schedules/edit/:id" component={ScheduleEdit}/>
            <Route exact path="/schedules/:id" component={ScheduleDetail}/>
            <Route exact path="/options" component={Options}/>
            <Route exact path="/calender" component={Calender}/>
            <Route component={Page404}/>
        </Switch>
    )
}

export default Router;
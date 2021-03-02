import {
    createStore as reduxCreateStore,
    combineReducers,
    applyMiddleware
} from 'redux';
import thunk from 'redux-thunk';
import {
    History
} from 'history';
import {
    connectRouter,
    routerMiddleware
} from 'connected-react-router'
import pickSchedulesReducer from '@/reducks/pickSchedules/reducers';
import schedulesReducer from '@/reducks/schedules/reducers';

const createStore = (history: History<unknown>) => {
    return reduxCreateStore(
        combineReducers({
            router: connectRouter(history),
            pickSchedules: pickSchedulesReducer,
            schedules: schedulesReducer
        }),
        applyMiddleware(
            routerMiddleware(history),
            thunk
        )
    )
}

export default createStore;
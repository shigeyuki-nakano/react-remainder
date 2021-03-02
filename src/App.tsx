import React from 'react';
import { createBrowserHistory } from 'history';
import createStore from '@/reducks/stores/store';
import DayjsUtil from '@date-io/dayjs';

import { ThemeProvider } from '@material-ui/styles'
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';

import theme from '@/assets/theme';
import Layout from '@/Layout';
import '@/assets/styles.css';

const history = createBrowserHistory();
export const store = createStore(history);

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <ThemeProvider theme={theme}>
                    <MuiPickersUtilsProvider utils={DayjsUtil}>
                        <Layout/>
                    </MuiPickersUtilsProvider>
                </ThemeProvider>
            </ConnectedRouter>
        </Provider>
    )
}

export default App;
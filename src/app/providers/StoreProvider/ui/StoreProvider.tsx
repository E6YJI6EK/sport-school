import { FC, ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../../../config/StateSchema';
import { store } from 'src/app/config/store';

interface StoreProviderProps {
    children?: ReactNode;
    initialState?: StateSchema;
}

export const StoreProvider:FC<StoreProviderProps> = (props) => {
    const {
        children,
        initialState
    } = props

    
    return(
        <Provider store={store}>
            {children}
        </Provider>
    );
}


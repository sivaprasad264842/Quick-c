import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


const queryClient = new QueryClient();

ReactDOM.render(
    <queryClient.Provider client={queryClient}>
        <App />
    </queryClient.Provider>,
    document.getElementById('root')
)
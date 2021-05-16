import React from 'react';
import ReactDOM from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import App from './App';
// import { QueryClient, }

const client = new QueryClient();

ReactDOM.render(
    <QueryClientProvider client={client}>
        <App />
    </QueryClientProvider>,
    document.getElementById('root')
);

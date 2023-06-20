import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import {
  RouterProvider,
} from "react-router-dom";
import { router } from './Routers/Routers';
import AuthProvider from './Providers/AuthProviders';
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>

    <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    </QueryClientProvider>

    </AuthProvider>
  </React.StrictMode>,
)

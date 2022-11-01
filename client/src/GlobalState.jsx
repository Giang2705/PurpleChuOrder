import React, { createContext, useState, useEffect } from 'react'
import ProductAPI from './apis/ProductAPI'
import UsersAPI from './apis/UsersAPI'
import CategoriesAPI from './apis/CategoriesAPI'
import axios from 'axios'
import InquiriesAPI from './apis/InquiriesAPI'
import NotificationsAPI from './apis/NotificationsAPI'

export const GlobalState = createContext()

export const DataProvider = ({children}) => {
    const [token, setToken] = useState(false);

    const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token')

        setToken(res.data.accesstoken)
    }
    useEffect(() => {
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin) refreshToken()
    }, [])

    ProductAPI()
    const state = {
        token: [token, setToken],
        productAPI: ProductAPI(),
        userAPI: UsersAPI(token),
        categoryAPI: CategoriesAPI(),
        inquiriesAPI: InquiriesAPI(),
        notiAPI: NotificationsAPI(),
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}
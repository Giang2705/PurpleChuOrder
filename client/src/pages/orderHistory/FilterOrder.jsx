import React, {useContext} from 'react'
import { useState } from 'react'
import {GlobalState} from '../../GlobalState'

function FilterOrder() {
    const state = useContext(GlobalState)
    const [methods, setMethods] = useState([])
    const [payments] = state.paymentAPI.payments
    const [method, setMethod] = state.paymentAPI.method
    const [status, setStatus] = state.paymentAPI.status
    const [sort, setSort] = state.paymentAPI.sort
    const [search, setSearch] = state.paymentAPI.search


    payments.map((item, index) => {
        methods.push(item.method);
    })

    const handleMethod = e => {
        setMethod(e.target.value)
        setSearch('')
    }

    const handleStatus = e => {
        setStatus(e.target.value)
        setSearch('')
    }

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="method" value={method} onChange={handleMethod} >
                    <option value=''>All Methods</option>
                    {
                        methods.map(method => (
                            <option value={"method=" + method} key={method}>
                                {method}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" value={search} placeholder="Enter your search!"
            onChange={e => setSearch(e.target.value.toLowerCase())} />
        </div>
    )
}

export default FilterOrder
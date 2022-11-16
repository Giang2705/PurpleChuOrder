import React, {useContext} from 'react'
import {GlobalState} from '../../GlobalState'

function LoadMore() {
    const state = useContext(GlobalState)
    const [page, setPage] = state.paymentAPI.page
    const [result] = state.paymentAPI.result

    return (
        <div className="load_more">
            {
                result < page * 20 ? ""
                : <button onClick={() => setPage(page+1)}>Load more</button>
            }
        </div>
    )
}

export default LoadMore
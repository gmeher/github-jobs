import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'MAKE_REQUEST',
    GET_DATA: 'GET_DATA',
    SET_ERROR: 'SET_ERROR',
    UPDATE_HAS_NEXT_PAGE: 'UPDATE_HAS_NEXT_PAGE'
}

const BASE_URL = 'https://jobs.github.com/positions.json';

const reducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.MAKE_REQUEST:
            return ({ jobs: [], loading: true, error: false })
            break;
        case ACTIONS.GET_DATA:
            return ({ ...state, jobs: action.payload.jobs, loading: false, error: false })
            break;
        case ACTIONS.SET_ERROR:
            return ({ ...state, jobs: [], loading: false, error: action.payload.error })
            break;
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return ({ ...state, hasNextPage: action.payload.hasNextPage })
        default:
            return state
            break;
    }
}


export default function useFetchJobs(params, page) {

    const [state, dispatch] = useReducer(reducer, { jobs: [], loading: true, error: false })

    useEffect(() => {

        const cancelToken1 = axios.CancelToken.source();
        dispatch({ type: ACTIONS.MAKE_REQUEST });
        axios.get(BASE_URL, {
            cancelToken: cancelToken1.token,
            params: { markdown: true, page: page, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.GET_DATA, payload: { jobs: res.data } })
        }).catch(error => {
            if (axios.isCancel(error)) return
            dispatch({ type: ACTIONS.SET_ERROR, payload: { error: error } })
        })

        const cancelToken2 = axios.CancelToken.source();

        axios.get(BASE_URL, {
            cancelToken: cancelToken2.token,
            params: { markdown: true, page: page + 1, ...params }
        }).then(res => {
            dispatch({ type: ACTIONS.UPDATE_HAS_NEXT_PAGE, payload: { hasNextPage: res.data.length !== 0 } })
        }).catch(error => {
            if (axios.isCancel(error)) return
            dispatch({ type: ACTIONS.SET_ERROR, payload: { error: error } })
        })
        return () => {
            cancelToken1.cancel()
            cancelToken2.cancel()
        }


    }, [params, page])


    return (
        state
    )
}
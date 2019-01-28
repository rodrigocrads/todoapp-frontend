import Axios from 'axios'

const URL = 'http://localhost:3003/api/todo'

export const changeDescription = event => ({
    type: 'DESCRIPTION_CHANGED',
    payload: event.target.value
})

export const search = () => {
    return (dispatch, getState) => {
        const description = getState().todo.description;
        const search = description ? `&description__regex=/${description}/` : '';
        Axios.get(`${URL}?sort=-createdAt${search}`)
            .then(resp => dispatch({
                type: 'TODO_SEARCHED',
                payload: resp.data,
            }))
    };
}

export const add = description => {
    return dispatch => {
        Axios.post(URL, { description, done: false })
            .then(resp => dispatch({
                type: 'TODO_ADDED',
                payload: resp.data
            }))
            .then(resp => dispatch(search()))
            .then(resp => dispatch(clear()))
    }
}

export const markAsDone = todo => {
    return dispatch => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: true })
            .then(resp => dispatch({ type: 'TODO_MARKED_AS_DONE'}))
            .then(resp => dispatch(search()))
    }
}

export const markAsPending = todo => {
    return dispatch => {
        Axios.put(`${URL}/${todo._id}`, { ...todo, done: false })
            .then(resp => dispatch({ type: 'TODO_MARKED_AS_PENDING'}))
            .then(resp => dispatch(search()))
    }
}

export const remove = todo => {
    return dispatch => {
        Axios.delete(`${URL}/${todo._id}`)
            .then(resp => dispatch({ type: 'TODO_REMOVED'}))
            .then(resp => dispatch(search()))
    }
}

export const clear = () => ([
        { type: 'TODO_CLEAR' },
        search()
    ])
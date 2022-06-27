import { call, put, takeEvery } from "redux-saga/effects";
import { getUsersFetch, getUsersSuccess, getUsersFailure, actionWithUserFailure } from "./usersSlice";
import { getUsers, addUsers, changeUser ,deleteUsers } from "./usersApi";


function* workGetUsersFetch() {
    try {
        const users = yield call(getUsers)
        yield put(getUsersSuccess(users))
    } catch (error) {
        yield put(getUsersFailure())
    }
}

function* workActionWithUserFetch(action) {
    try {
        switch (action.payload.type) {
            case "ADD": {
                yield call(addUsers, action.payload.params)
                break;
            }
            case "CHANGE": {
                yield call(changeUser, action.payload.params)
                break;
            }
            case "DELETE": {
                yield call(deleteUsers, action.payload.params)
                break;
            }
            default: {
                yield put(actionWithUserFailure())
                return;
            }
        }
        yield put(getUsersFetch())
    } catch (error) {
        yield put(actionWithUserFailure())
    }
}

function* usersSaga() {
    yield takeEvery("users/getUsersFetch", workGetUsersFetch)
    yield takeEvery("users/actionWithUserFetch", workActionWithUserFetch)
}

export default usersSaga;

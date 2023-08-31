import { error, end, start, login as loginReducer, getUser as getUserReducer, getUsers as getUsersReducer, getUserStats as getUserStatsReducer, register as registerReducer, updateUser as updateUserReducer, deleteUser as deleteUserReducer } from "../reducers/user"
import * as api from '../api'
import { singinWithEmailAndPassword, createWithEmailAndPassword as createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../firebase'
import { addDoc, collection, setDoc, doc, serverTimestamp, getDocs, onSnapshot } from 'firebase/firestore'

export const getUsers = ({ new: new_query } = {}) => async (dispatch) => {
    dispatch(start());
    try {
        // Listening on reload
        // const querySnapshot = await getDocs(collection(db, 'users'))
        // let list = []
        // querySnapshot.forEach(doc => {
        //     list.push({id:doc.id, ...doc.data()})
        // });
        // dispatch(getUsersReducer(list));

        // Listening Realtime
        const unsub = onSnapshot(collection(db, 'users'),
            (snapshot) => {
                let list = []
                snapshot.docs.forEach(doc => {
                    list.push({ id: doc.id, ...doc.data() })
                });
                dispatch(getUsersReducer(list));
            })

        unsub()
    } catch (err) {
        dispatch(error());
    }
    dispatch(end());
};

export const getUser = (id) => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.getUser(id);
        dispatch(getUserReducer(data.result));
    } catch (err) {
        dispatch(error());
    }
    dispatch(end());
};

export const getUserStats = () => async (dispatch) => {
    dispatch(start());
    try {
        const { data } = await api.getUserStats();
        dispatch(getUserStatsReducer(data.result));
    } catch (err) {
        dispatch(error());
    }
    dispatch(end());
};

export const register = (userData) => async (dispatch) => {
    dispatch(start())
    try {
        const { user } = await createUserWithEmailAndPassword(auth, userData.email, userData.password)
        await setDoc(doc(db, 'users', user?.uid), { ...userData, timeStamp: serverTimestamp() })
        dispatch(registerReducer())
        navigate('/login')
    } catch (err) {
        dispatch(error())
    }
    dispatch(end());
}

export const login = (userData, navigate) => async (dispatch) => {
    dispatch(start())
    try {
        const { user } = await singinWithEmailAndPassword(auth, userData.email, userData.password)
        dispatch(loginReducer(user))
        navigate('/')
    } catch (err) {
        dispatch(error())
    }
    dispatch(end());
}

export const updateUser = (id, user) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.updateUser(id, user)
        dispatch(updateUserReducer(data.result))
    } catch (err) {
        dispatch(error())
    }
    dispatch(end());
}

export const deleteUser = (id) => async (dispatch) => {
    dispatch(start())
    try {
        const { data } = await api.deleteUser(id)
        dispatch(deleteUserReducer(data.result))
    } catch (err) {
        dispatch(error())
    }
    dispatch(end());
}

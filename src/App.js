import {useCallback, useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {actionWithUserFetch, getUsersFetch} from "./features/users/usersSlice";

import {Button, Pagination, Modal} from 'antd';

import ModalForm from "./components/ModalForm/ModalForm";

function App() {
    const dispatch = useDispatch()
    const users = useSelector(state => state.users.users)

    const deleteUserRef = useRef(null)

    const [page, setPage] = useState(1);
    const [usersShow, setUsersShow] = useState([]);

    const [modalInfo, setModalInfo] = useState({})
    const [isFormModalVisible, setIsFormModalVisible] = useState(false);
    const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

    const onPageChange = useCallback((newPage) => {
        const lastElement = newPage * 5
        setUsersShow(users.slice(lastElement - 5, lastElement))
        setPage(newPage)
    }, [users])

    useEffect(() => {
        dispatch(getUsersFetch())
    }, [dispatch])

    useEffect(() => {
        onPageChange(page)
    }, [onPageChange, page, users])


    const onUserCreate = () => {
        setModalInfo({type: "ADD", title: "Create User"})
        setIsFormModalVisible(true)
    }
    const onUserChange = (name, surname, desc, userId) => {
        setModalInfo({type: "CHANGE", title: "Create User", params: {name, surname, desc, userId}})
        setIsFormModalVisible(true)
    }

    const onDeleteUserButtonClick = (user_id) => {
        setIsDeleteModalVisible(true)
        deleteUserRef.current = user_id;
    }

    const onDeleteUser = () => {
        dispatch(actionWithUserFetch({
            type: "DELETE",
            params: {
                userId: deleteUserRef.current
            }
        }))
        setIsDeleteModalVisible(false)
    }

    const onDeleteUserCancel = () => {
        setIsDeleteModalVisible(false)
    }

    return (
        <div className="container">

            <div className="header">
                <h1 className="header_title">Users</h1>
                <Button type="primary" onClick={onUserCreate}>Add User</Button>
            </div>

            <div className="list">
                {usersShow.map(({name, surname, desc, user_id}) => <div key={user_id} className="list_item">
                    <div className="title">{name} {surname}</div>
                    <div className="desc">{desc}</div>
                    <div className="button_group">
                        <Button type="primary" className="button" onClick={() => onUserChange(name, surname, desc, user_id)}>Change</Button>
                        <Button type="danger" className="button" onClick={() => onDeleteUserButtonClick(user_id)}>Delete</Button>
                    </div>
                </div>)}
            </div>

            <div className="pagination">
                <Pagination current={page} onChange={onPageChange} defaultPageSize={5} total={users.length} />
            </div>


            <ModalForm isModalVisible={isFormModalVisible} setIsModalVisible={setIsFormModalVisible} modalInfo={modalInfo}/>

            <Modal title="Basic Modal" visible={isDeleteModalVisible} onOk={onDeleteUser} onCancel={onDeleteUserCancel}>
                <p>Do you want to delete user ?</p>
            </Modal>
        </div>
    );
}

export default App;

import {useEffect, useState} from "react";
import {Input, Modal} from "antd";
import {useDispatch} from "react-redux";
import {actionWithUserFetch} from "../../features/users/usersSlice";

const ModalForm = ({isModalVisible, setIsModalVisible, modalInfo}) => {
    const dispatch = useDispatch()
    const {TextArea} = Input;

    useEffect(() => {
        setName(modalInfo?.params?.name ? modalInfo?.params?.name : "")
        setSurname(modalInfo?.params?.surname ? modalInfo?.params?.surname : "")
        setDesc(modalInfo?.params?.desc? modalInfo?.params?.desc : "")
    }, [modalInfo])

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [desc, setDesc] = useState("");

    const [nameStatus, setNameStatus] = useState("");
    const [surnameStatus, setSurnameStatus] = useState("");
    const [descriptionStatus, setDescriptionStatus] = useState("");

    const onChange = (e) => {
        const value = e.target.value
        switch (e.target.name) {
            case "Name": {
                setName(value)
                return
            }
            case "Surname": {
                setSurname(value)
                return
            }
            case "Description": {
                setDesc(value)
                return
            }
            default:
                return
        }
    }

    const nameValidate = () => {
        const validate = name.length === 0;
        validate ? setNameStatus("error") : setNameStatus("")
        return !validate
    }

    const surnameValidate = () => {
        const validate = surname.length === 0;
        validate ? setSurnameStatus("error") : setSurnameStatus("")
        return !validate
    }

    const descriptionValidate = () => {
        const validate = desc.length === 0;
        validate ? setDescriptionStatus("error") : setDescriptionStatus("")
        return !validate
    }

    const onModalOk = () => {
        const nameResult = nameValidate();
        const surnameResult = surnameValidate();
        const descriptionResult = descriptionValidate();

        if (nameResult && surnameResult && descriptionResult) {

            dispatch(actionWithUserFetch({
                type: modalInfo.type,
                params: {
                    name,
                    surname,
                    desc,
                    userId: modalInfo?.params?.userId
                }
            }))

            setName("")
            setSurname("")
            setDesc("")

            setIsModalVisible(false)
        }
    }

    const onCancel = () => {
        setIsModalVisible(false)
    }

    return (
        <Modal title={modalInfo.title} visible={isModalVisible} onOk={onModalOk} onCancel={onCancel}>
            <form className="form">
                <Input
                    onChange={onChange}
                    onBlur={nameValidate}
                    status={nameStatus}
                    placeholder="User name"
                    name="Name"
                    value={name}/>

                <Input
                    onChange={onChange}
                    onBlur={surnameValidate}
                    status={surnameStatus}
                    placeholder="User surname"
                    name="Surname"
                    value={surname}/>

                <TextArea
                    rows={4}
                    onChange={onChange}
                    onBlur={descriptionValidate}
                    status={descriptionStatus}
                    placeholder="Description"
                    name="Description" value={desc}/>
            </form>
        </Modal>
    );
};

export default ModalForm;

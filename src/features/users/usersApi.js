import axios from "axios";

export const getUsers = async () => {
    const options = {
        method: "GET",
        url: `${process.env.REACT_APP_API_URL}/users`,
    }

  return await axios.request(options).then((res) => res.data)
}

export const changeUser = async ({userId, name, surname, desc}) => {
    const options = {
        method: "PUT",
        url: `${process.env.REACT_APP_API_URL}/user/${userId}`,
        data: {
            name,
            surname,
            desc,
        }
    }

  return await axios.request(options).then((res) => res.data)
}

export const addUsers = async ({name, surname, desc}) => {
    const options = {
        method: "POST",
        url: `${process.env.REACT_APP_API_URL}/users`,
        data: {
            name,
            surname,
            desc,
        }
    }

  return await axios.request(options).then((res) => res.data)
}

export const deleteUsers = async ({userId}) => {
    const options = {
        method: "DELETE",
        url: `${process.env.REACT_APP_API_URL}/user/${userId}`,
    }

  return await axios.request(options).then((res) => res.data)
}

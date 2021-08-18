import React, { useState } from 'react';
import axios from 'axios';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CustomModalEdit from '../CustomModalEdit';

const UserEdit = ({ user }) => {
    const [open, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(!open);
    };

    const handleEdit = async (payload) => {
        const response = await axios.post('api/fake-data/edit-user', {
            payload,
        });
        console.log('Rersposne => ', response.data);
    };

    return (
        <>
            <Fab color="secondary" aria-label="edit" onClick={handleModal}>
                <EditIcon />
            </Fab>
            <CustomModalEdit
                title="Editar Usuario"
                open={open}
                content={user}
                handleModal={handleModal}
                handleEdit={handleEdit}
            />
        </>
    );
};

export default UserEdit;

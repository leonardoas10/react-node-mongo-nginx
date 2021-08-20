import React, { useState, useContext } from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CustomModalEdit from '../CustomModalEdit';
import { Context } from '../../store/store';

const UserEdit = ({ user }) => {
    const [open, setOpen] = useState(false);
    const handleEdit = useContext(Context).handleUserEdit;

    const handleModal = () => {
        setOpen(!open);
    };

    return (
        <>
            <Fab color="secondary" aria-label="edit" onClick={handleModal}>
                <EditIcon />
            </Fab>
            <CustomModalEdit
                title="Edit User"
                open={open}
                content={user}
                handleModal={handleModal}
                handleEdit={handleEdit}
            />
        </>
    );
};

export default UserEdit;

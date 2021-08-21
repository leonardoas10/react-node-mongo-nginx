import React, { useState, useContext } from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CustomModalEdit from '../CustomModalEdit';
import { Context } from '../../store/store';

const UserEdit = ({ user }) => {
    const handleEdit = useContext(Context).handleUserEdit;
    const customModalEditOpen = useContext(Context).customModalEditOpen;
    const handleCustomModalEditOpen =
        useContext(Context).handleCustomModalEditOpen;

    return (
        <>
            <Fab
                color="secondary"
                aria-label="edit"
                onClick={handleCustomModalEditOpen}
            >
                <EditIcon />
            </Fab>
            <CustomModalEdit
                title="Edit User"
                open={customModalEditOpen}
                content={user}
                handleModal={handleCustomModalEditOpen}
                handleEdit={handleEdit}
            />
        </>
    );
};

export default UserEdit;

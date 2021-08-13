import React, { useState } from 'react';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import CustomModal from '../CustomModal';

const UserEdit = ({ user }) => {
    const [open, setOpen] = useState(false);

    const handleModal = () => {
        setOpen(!open);
    };

    return (
        <>
            <Fab color="secondary" aria-label="edit" onClick={handleModal}>
                <EditIcon />
            </Fab>
            <CustomModal
                title="Editar Usuario"
                open={open}
                content={user}
                handleModal={handleModal}
            />
        </>
    );
};

export default UserEdit;

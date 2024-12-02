import React from 'react';
import { Modal, Button } from 'react-bootstrap';


interface ManageAccessModalProps {
    show: boolean;
    onClose: () => void;
    title?: string;
    data?: any;
}


const ManageCandidateAccessModal: React.FC<ManageAccessModalProps> = ({ show, onClose, title, data }) => {


    return (
        <Modal show={show} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title || 'Manage Access'}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p>Modal body content</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Close
                </Button>
                <Button variant="primary">
                    Grant access
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ManageCandidateAccessModal;

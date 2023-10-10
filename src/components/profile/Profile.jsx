import React from 'react';
import avatar from '../../img/avatar.png';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useQuery } from 'react-query';

function Profile() {
    const [show, setShow] = React.useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const host = window.location.origin;
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token);
    const fetchMessages = async () => {
        const response = await axios.get('https://sara7aiti.onrender.com/api/v1/message', {
            headers: {
                token,
            },
        });
        return response.data.allMessages;
    };
    const { data: allMessages, isLoading } = useQuery('messages', fetchMessages);

    return (
        <>
            <div className="container text-center py-5 my-5 text-center">
                <div className="card pt-5">
                    <a href="" data-toggle="modal" data-target="#profile">
                        <img src={avatar} className="avatar " alt="" />
                    </a>
                    <h3 className="py-2">{decoded.name}</h3>
                    <Button variant="btn btn-default-outline share" onClick={handleShow}>
                        <i className="fas fa-share-alt me-2"></i>Share Profile
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Link Profile</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{`${host}/SendMessage/${decoded.id}`}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
            <div className="container text-center my-5 text-center">
                <div className="row">
                    {isLoading ? (
                        <div className="col-md-12">
                            <div className="card py-5">
                                <p>Loading messages...</p>
                            </div>
                        </div>
                    ) : allMessages?.length === 0 ? (
                        <div className="col-md-12">
                            <div className="card py-5">
                                <p>You don't have any messages...</p>
                            </div>
                        </div>
                    ) : (
                        allMessages.map((ele) => (
                            <div key={ele._id} className="col-md-12 mb-4">
                                <div className="card py-5">
                                    <p>{ele.messageContent}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default Profile;

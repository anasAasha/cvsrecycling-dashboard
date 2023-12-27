import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ListGroup,
  Form,
  Modal,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  sendMessage,
  getAllMessages,
  getAllUsers,
  deleteChat,
} from "../../redux/actions/contactActions";
import { MdAccessTime } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { FaImage } from "react-icons/fa";

function ContactUsMessages() {
  const dispatch = useDispatch();
  const members = useSelector((state) => state.contact.users);
  const messages = useSelector((state) => state.contact.messages);
  const sendMessageError = useSelector(
    (state) => state.contact.sendMessageError
  );
  const getAllMessagesError = useSelector(
    (state) => state.contact.getAllMessagesError
  );

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [messageText, setMessageText] = useState("");
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUserId) {
      dispatch(getAllMessages(selectedUserId));
    }
  }, [dispatch, selectedUserId]);

  const handleSendMessage = () => {
    if (selectedUserId && messageText.trim() !== "") {
      dispatch(sendMessage(selectedUserId, messageText, ""));
      setMessageText("");
    }
  };

  const handleDeleteChat = () => {
    if (selectedUserId) {
      dispatch(deleteChat(selectedUserId));
      setSelectedUserId(null);
    }
  };
  const handleOpenImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setShowImageModal(true);
  };
  const handleCloseEditModal = () => {
    setShowImageModal(false);
  };

  return (
    <Container fluid className="py-5 gradient-custom">
      <Row>
        <Col md="6" lg="5" xl="4" className="mb-4 mb-md-0 ">
          <h5 className="font-weight-bold mb-3 text-center text-white">
            Users
          </h5>

          <Card className="mask-custom">
            <Card.Body>
              {/* <ListGroup variant="flush" className="mb-0"> */}
              <ListGroup variant="flush" className="mb-0">
                {members.length === 0 ? (
                  <p className="text-center">No users available</p>
                ) : (
                  members.map((member) => (
                    <ListGroup.Item
                      key={member.id}
                      style={{
                        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                        background:
                          selectedUserId === member.id ? "none" : "transparent",
                      }}
                      className="p-2 border-bottom "
                      onClick={() => setSelectedUserId(member.id)}
                    >
                     
                        <div className="d-flex flex-row">
                        
                          <img
                            src={member.image}
                            alt="avatar"
                            className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                            width="60"
                            loading="lazy"
                          />
                         
                          <div className="pt-1">
                            <p className="fw-bold mb-0 text-light">{member.fullName}</p>
                            <p className="small text-white">
                              Shop: {member.shopName}
                            </p>
                          </div>
                        </div>
                    
                    </ListGroup.Item>
                  ))
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md="6" lg="7" xl="8">
          <div style={{ maxHeight: "500px", overflowY: "auto" }}>
            <ListGroup className="text-white">
              {selectedUserId ? (
                messages.map((message) => (
                  <ListGroup.Item
                    key={message.id}
                    className="d-flex justify-content-between mb-2"
                    style={{
                      border: "0",
                      background:
                        selectedUserId === message.id ? "none" : "transparent",
                    }}
                  >
                    <Card className="w-100 mask-custom ">
                      <Card.Header
                        className="d-flex justify-content-between p-3"
                        style={{
                          borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                          background: "transparent",
                        }}
                      >
                        <p className="fw-bold mb-0 text-light">{message.sender}</p>
                        <p className="small text-muted mb-1">
                          <MdAccessTime className="me-2" />
                          {new Intl.DateTimeFormat("en-GB", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          }).format(new Date(message.date))}{" "}
                          {new Intl.DateTimeFormat("en-GB", {
                            hour: "numeric",
                            minute: "numeric",
                          }).format(new Date(message.date))}
                        </p>
                      </Card.Header>
                      <Card.Body>
                        <p className="mb-0 text-light">{message.message}</p>
                        {message.image && (
                          <div>
                            <Button
                              variant=""
                              onClick={() =>
                                handleOpenImageModal(message.image)
                              }
                            >
                              <FaImage className="mx-2" size={25} />
                              View Image
                            </Button>
                          </div>
                        )}
                      </Card.Body>
                    </Card>
                  </ListGroup.Item>
                ))
              ) : (
                <p className="text-center">Please select a user to chat</p>
              )}
            </ListGroup>
          </div>

          <ListGroup.Item className=" ">
            <Form.Group controlId="textAreaExample">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                color="light"
                className="float-end"
                style={{
                  borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
                  background: "transparent",
                }}
                size="lg"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
            </Form.Group>
          </ListGroup.Item>
          <Button
            variant="info"
            className="float-end mt-3   "
            onClick={handleSendMessage}
          >
            Send
            <IoIosSend size={25} className="ms-2" />
          </Button>
          <Button
            variant="danger"
            className="float-start mt-3"
            onClick={handleDeleteChat}
          >
            Delete Chat
          </Button>
        </Col>

        <Modal
          show={showImageModal}
          onHide={handleOpenImageModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Image Preview</Modal.Title>
          </Modal.Header>
          <Modal.Body>
         
            <img
              src={selectedImage}
              alt="Preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                margin: "auto",
                display: "block",
              }}
              loading="lazy"
            />
           
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={handleCloseEditModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Row>
      {sendMessageError && <p>Error sending message: {sendMessageError}</p>}
      {getAllMessagesError && (
        <p>Error fetching messages: {getAllMessagesError}</p>
      )}
    </Container>
  );
}

export default ContactUsMessages;

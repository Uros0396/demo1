import Modal from 'react-bootstrap/Modal'

function MyModal({name, show}) {
  return (
    <Modal
        show={show}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header>
          <Modal.Title>Welcome {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Epibooks
        </Modal.Body>
    </Modal>
  );
}

export default MyModal
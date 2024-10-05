import {  useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import ReviewsContext from '../ReviewsContext/ReviewsContext';


function NewReviewModal({show, setShow}) {
    const {reviewToReload, setReviewToReload, asin} = useContext(ReviewsContext)
    
    const handleClose = () => {
        setRate("")
        setComment("")
        setMessage(""); 
        setShow(false);
        setIsSubmiting(false)
    };
    const [comment, setComment] = useState("")
    const [rate, setRate] = useState(1)

    const [showError, setShowError] = useState(false)
    const [isSubmitting, setIsSubmiting] = useState(false)
    const [message, setMessage] = useState("")
    
    const handleSubmit = async () => {
        setIsSubmiting(true)

        const commentData = {
            elementId: asin,
            comment: comment,
            rate: rate,
        }

        try {
            const response = await fetch('https://striveschool-api.herokuapp.com/api/comments/',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NmVlOWQ5Y2NiMjkxYzAwMTU4ZmZhNzYiLCJpYXQiOjE3MjY5MTM5NDgsImV4cCI6MTcyODEyMzU0OH0.J_kRGzLfLnx17wdw-29AEFnyzf_BotE8397dKj8gYyk"
                },
                body: JSON.stringify(commentData),
            })

            if (!response.ok) {
                setMessage("errore durante l' invio")
                return   
            }

            setMessage('Commento inviato con successo!')
            setComment('')
            setRate("")
            setReviewToReload(!reviewToReload)
        } catch (error) {
            setMessage("Si e' verificato un errore" + error.message)
        }

        setIsSubmiting(false)
    }

    const handleAdd = async () => {
        if(!comment || !rate || rate < 1 || rate > 5) {
            setShowError(true)
            return
        }

        setShowError(false);
        await handleSubmit(); 
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add new Review</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='d-flex flex-column gap-2 mx-5'>
                        <label>Review</label>
                        <textarea 
                            type='text' 
                            placeholder='Insert review'
                            value={comment}
                            onChange={(e) => {
                                setComment(e.target.value)
                                
                                setShowError(false)
                            }}
                            className='p-1 ps-2'
                            style={{height: '5rem'}}
                        />
                        
                        <label>Rate</label>
                        <input 
                            type='number' 
                            placeholder='Insert rate'
                            value={rate}
                            onChange={(e) => {
                                setRate(parseInt(e.target.value))
                                
                                setShowError(false)
                            }}
                            className='p-1 ps-2'
                        />
                </form>
                {showError &&  <p className='text-danger'>Both review and rating is necessary!</p>}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                Close
                </Button>
                <Button variant="primary" onClick={handleAdd} disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Add'} 
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewReviewModal;


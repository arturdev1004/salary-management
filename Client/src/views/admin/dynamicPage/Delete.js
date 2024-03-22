import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay } from '@chakra-ui/react';
import Spinner from 'components/spinner/Spinner';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteApi, deleteManyApi } from 'services/api';

const Delete = (props) => {
    const [isLoding, setIsLoding] = useState(false)
    const navigate = useNavigate()
    const pathName = window.location.pathname.split('/')
    const title = pathName[1];

    const handleDeleteClick = async () => {
        if (props.method === 'one') {
            try {
                setIsLoding(true)
                const response = await deleteApi(props.url, props.id)
                if (response.status === 200) {
                    navigate('/lead')
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoding(false)
            }
        } else if (props.method === 'many') {
            try {
                setIsLoding(true)
                const payload = {
                    moduleId: props.moduleId,
                    ids: props.data
                }
                let response = await deleteManyApi(props.url, payload)
                if (response.status === 200) {
                    props.setSelectedValues([])
                    props.onClose(false)
                    props.setAction((pre) => !pre)
                }
            } catch (error) {
                console.log(error)
            }
            finally {
                setIsLoding(false)
            }
        }
    };

    const handleClose = () => {
        props.onClose(false)
    }

    return (
        <div>
            <Modal onClose={props.onClose} isOpen={props.isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Delete Lead{props.method === 'one' ? '' : 's'}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Are You Sure To Delete selected {title} record?
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="red" size="sm" mr={2} onClick={handleDeleteClick} disabled={isLoding ? true : false} >{isLoding ? <Spinner /> : 'Yes'}</Button>
                        <Button variant="outline" size="sm" onClick={handleClose}>No</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    )
}

export default Delete
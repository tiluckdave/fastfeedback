import React, { useRef } from 'react'
import { mutate } from 'swr'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    useDisclosure,
    Button
} from '@chakra-ui/react'

import { DeleteIcon } from '@chakra-ui/icons'
import { deleteFeedback } from '@/lib/db'
import { useAuth } from '@/lib/auth'

function DeleteFeedbackButton({ feedbackId }) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = useRef()
    const auth = useAuth()

    const onDelete = () => {
        deleteFeedback(feedbackId)
        mutate([ '/api/feedback', auth.user.token ], async data => {
            return { feedback: data.feedback.filter((feedback) => feedback.id !== feedbackId) }
        }, false);
        onClose()
    }

    return (
        <>
            <IconButton icon={<DeleteIcon />} aria-label="Delete feedback" variant="ghost" onClick={onOpen} />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Feedback
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            Are you sure? You can{`'`}t undo this action afterwards.
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                Cancel
                            </Button>
                            <Button colorScheme='red' onClick={onDelete} ml={3}>
                                Delete
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default DeleteFeedbackButton;
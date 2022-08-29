import { useForm } from 'react-hook-form';
import { mutate } from 'swr';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    Switch,
    useToast,
    useDisclosure,
    Flex
} from '@chakra-ui/react';

import { SettingsIcon } from '@chakra-ui/icons'

import { updateSite } from '@/lib/db';

const EditSiteModal = ({ settings, siteId, children }) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleSubmit, register } = useForm();

    const onUpdateSite = async (newSettings) => {
        await updateSite(siteId, {
            settings: newSettings
        });
        toast({
            title: 'Success!',
            description: "We've updated your site.",
            status: 'success',
            duration: 5000,
            isClosable: true
        });
        mutate(`/api/site/${siteId}`);
        onClose();
    };

    return (
        <>
            <Button
                onClick={onOpen}
                backgroundColor="gray.900"
                color="white"
                fontWeight="medium"
                leftIcon={<SettingsIcon />}
                _hover={{ bg: 'gray.700' }}
                _active={{
                    bg: 'gray.800',
                    transform: 'scale(0.95)'
                }}
            >
                {children}
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent as="form" onSubmit={handleSubmit(onUpdateSite)}>
                    <ModalHeader fontWeight="bold">Edit Site</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <Switch
                                key={settings?.timestamp}
                                {...register('timestamp')}
                                color="green"
                                display="inline"
                                defaultIsChecked={settings?.timestamp}
                            />
                            <FormLabel ml={2} mt={4} display="inline" htmlFor="show-timestamp">
                                Show Timestamp
                            </FormLabel>
                        </FormControl>
                        <FormControl>
                            <Switch
                                key={settings?.icons}
                                {...register('icons')}
                                color="green"
                                display="inline"
                                defaultIsChecked={settings?.icons}
                            />
                            <FormLabel ml={2} display="inline" htmlFor="show-icons">
                                Show Icon
                            </FormLabel>
                        </FormControl>
                        <FormControl>
                            <Switch
                                key={settings?.ratings}
                                {...register('ratings')}
                                color="green"
                                display="inline"
                                defaultIsChecked={settings?.ratings}
                            />
                            <FormLabel ml={2} display="inline" htmlFor="show-ratings">
                                Show Ratings
                            </FormLabel>
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onClose} mr={3} fontWeight="medium">
                            Cancel
                        </Button>
                        <Button
                            backgroundColor="#99FFFE"
                            color="#194D4C"
                            fontWeight="medium"
                            type="submit"
                        >
                            Update
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default EditSiteModal;
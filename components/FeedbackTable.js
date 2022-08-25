import React from "react";
import { Table, Tr, Th } from "@/components/Table";
import { Box } from "@chakra-ui/react";
import FeedbackRow from "./FeedbackRow";

const FeedbackTable = (props) => {
    return <Box overflowX="scroll">
        <Table w="full">
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th width="50px">{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {props.feedback.map((feedback) => (
                    <FeedbackRow key={feedback.id} {...feedback} />
                ))}
            </tbody>
        </Table>
    </Box>
}

export default FeedbackTable;
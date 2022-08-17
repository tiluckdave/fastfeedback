import { Icon as ChakraIcon } from '@chakra-ui/react'

import myIcons from "@/styles/icons"

const Icon = (props) => {
    return <ChakraIcon viewBox={myIcons[ props.name ].viewBox} {...props}>
        {myIcons[ props.name ].path}
    </ChakraIcon>
}

export default Icon
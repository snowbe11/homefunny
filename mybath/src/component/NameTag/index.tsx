import React from 'react'
import { Text } from '@blueprintjs/core'

export const NameTag = (props: {name:string}) => {
    return (
        <Text>
            {props.name}
        </Text>
    )
}

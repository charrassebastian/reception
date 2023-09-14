import { Text } from '@fluentui/react-components'
export function TriviaExplanation(explanation){
    return (
        <div>
            <Text as="p">{ explanation }</Text>
        </div>
    )
}
import { NavigationContainer } from '@react-navigation/native'
import { Box, Input, Button, View, Center } from 'native-base'
import { useState } from 'react'
import { API } from '../config/api'

export default function FormTodo({ navigation }) {
    const [form, setForm] = useState({
        todo: ''
    })

    const handleChange = (e) => {
        setForm({
            ...form,
            todo: e.target.value
        })
    }

    const handlePress = () => {
        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        if (form.todo == '') {
            return alert('data is empty')
        }
        const body = JSON.stringify(form)

        API.post('/todo', body, config)
            .then((res) => {
                console.log(res.data.todo)
            }).catch((err) => {
                console.log('failed! ' + err)
                alert('failed! ' + err)
            })

        navigation.navigate('Todo List')
    }

    return (
        <View flex='1' bg='primary.50'>
            <Box alignItems="center" mt='5' >
                {/* <FormControl isRequired> */}
                <Center>
                    <Input name='todo' mx="3" width='300' placeholder="Enter Todo" maxWidth="500px" bg='white' onChange={handleChange} />
                    <Button mt='8' mx="3" width="150px" onPress={handlePress}>Submit</Button>
                </Center>
                {/* </FormControl> */}
            </Box>
        </View>
    )
}
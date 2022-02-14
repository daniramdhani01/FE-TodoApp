import { View, Box, Center, Input, Button } from 'native-base'
import { useEffect, useState } from 'react'
import { API } from '../config/api'

export default function EditTodo({ route, navigation }) {
    const [todo, setTodo] = useState({
        todo: ''
    })

    const [form, setForm] = useState({
        todo: ''
    })

    const id = route.params

    const getTodo = () => {
        API.get('/todo/' + id).then((res) => {
            setTodo(res.data.todo)
        }).catch((err) => {
            console.log(err)
            alert('failed! ' + err)
        })
        // console.log(todo)
    }

    useEffect(() => {
        getTodo()
    }, [])

    const handleChange = (e) => {
        setForm({
            todo: e.target.value
        })
    }

    const handleUpdate = () => {
        console.log(form)

        const config = {
            headers: {
                'Content-type': 'application/json',
            }
        }
        const body = JSON.stringify(form)

        API.patch('/todo/' + todo.id, body, config)
            .then((res) => {
                console.log(res)
                alert('Todo has been update')
            }).catch((err) => {
                console.log(err)
                alert('failed! ' + err)
            })

        navigation.navigate('TodoApp')
    }

    return (
        <View flex='1' bg='primary.50'>
            <Box alignItems="center" mt='5' >
                <Center>
                    <Input name='todo' mx="3" width='300' placeholder="Enter Todo" maxWidth="500px" bg='white' defaultValue={todo.todo} onChange={handleChange} />
                    <Button mt='8' mx="3" width="150px" onPress={handleUpdate}>Submit</Button>
                </Center>
            </Box>
        </View>
    )
}
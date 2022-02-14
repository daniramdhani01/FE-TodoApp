import React from 'react';
import { FlatList, StyleSheet, Touchable, TouchableOpacity } from 'react-native'
import {
    Pressable,
    Box,
    HStack,
    CloseIcon,
    CircleIcon,
    CheckCircleIcon,
    useTheme,
    View,
    Text
} from 'native-base'
import { useEffect, useState } from 'react';
import { API } from '../config/api';
import { Ionicons } from "@expo/vector-icons"
import { useFocusEffect } from '@react-navigation/native';


export default function TodoList({ navigation }) {
    const [todo, setTodo] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const getTodo = () => {
        setIsLoading(true)
        API.get('/todos')
            .then((res) => {
                setTodo(res.data.todos)
                // console.log(res.data.todos)
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                alert('failed fatching data. ' + err)
                setIsLoading(false)
            })
    }

    useFocusEffect(
        React.useCallback(() => {

            getTodo()
            // alert('Screen was focused');
            return () => {
                // alert('Screen was unfocused');
                // Useful for cleanup functions
            };
        }, [navigation])
    )

    const handleDelete = (id) => {
        API.post('/todo/' + id)
            .then(() => {
                getTodo()
            })
            .catch((err) => {
                console.log(err)
                alert('delete error! ' + err)
            })
    }

    const handleComplete = (id) => {
        API.patch('/todo-complete/' + id)
            .then(() => {
                getTodo()
            })
            .catch((err) => {
                console.log(err)
                alert('failed! ' + err)
            })
    }

    const handleIncomplete = (id) => {
        API.patch('/todo-incomplete/' + id)
            .then(() => {
                getTodo()
            })
            .catch((err) => {
                console.log(err)
                alert('failed! ' + err)
            })
    }

    const _renderItem = ({ item }) => {
        return (
            <HStack alignItems="center" justifyContent='center' mt='5'>
                <Pressable onPress={item.isComplete ? () => handleIncomplete(item.id) : () => handleComplete(item.id)}>
                    {({
                        isHovered,
                        isFocused,
                        isPressed
                    }) => {
                        return <Box p='1' width='200' alignItems='flex-start' justifyContent='center'
                            borderTopLeftRadius='8'
                            borderBottomLeftRadius='8'
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                            bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.50"}>
                            <HStack alignItems="center" justifyContent='center'>

                                {item.isComplete ?
                                    <CheckCircleIcon size="10" mt="0.5" color="emerald.500" marginRight='2' />
                                    :
                                    <CircleIcon size="10" mt="0.5" color="coolGray.400" marginRight='2' />
                                }

                                <Text>{item.todo}</Text>
                            </HStack>
                        </Box>;
                    }}
                </Pressable>
                {/* <Pressable onPress={()=>handleEdit(item.id)}> */}
                <Pressable onPress={() => navigation.navigate('EditTodo', item.id)}>
                    {({
                        isHovered,
                        isFocused,
                        isPressed
                    }) => {
                        return <Box p='3' alignItems='flex-start' justifyContent='center'
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                            bg={isPressed ? "warning.300" : isHovered ? "warning.300" : "warning.200"}>
                            <Ionicons name="pencil" size={23} color="white" />
                        </Box>;
                    }}
                </Pressable>
                <Pressable onPress={() => handleDelete(item.id)}>
                    {({
                        isHovered,
                        isFocused,
                        isPressed
                    }) => {
                        return <Box p='3' alignItems='flex-start' justifyContent='center'
                            borderTopRightRadius='8'
                            borderBottomRightRadius='8'
                            style={{
                                transform: [{
                                    scale: isPressed ? 0.96 : 1
                                }]
                            }}
                            bg={isPressed ? "danger.300" : isHovered ? "danger.300" : "danger.200"}>
                            <CloseIcon size='25' color='white' />
                        </Box>;
                    }}
                </Pressable>
            </HStack>
        )
    }

    return (
        <View flex='1' bg='primary.50'>
            <FlatList
                data={todo}
                renderItem={_renderItem}
                keyExtractor={(item) => item.id.toString()}
                refreshing={isLoading}
                onRefresh={getTodo}
            />
        </View>
    )
}
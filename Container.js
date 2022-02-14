import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'native-base';

//import screen
import TodoList from './src/screen/TodoList';
import FormTodo from './src/screen/FormTodo';
import EditTodo from './src/screen/EditTodo';

//stack navigation
const Stack = createStackNavigator()

//bottom tab navigation
const Tab = createBottomTabNavigator()

function MyTab() {
    const theme = useTheme()

    return (
        <Tab.Navigator
            initialRouteName='List'
            screenOptions={({ route }) => ({
                headerMode: 'screen',
                headerTintColor: 'white',
                headerStyle: { backgroundColor: theme.colors.primary['300'] },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name == 'Todo List') {
                        iconName = focused ? 'list-circle' : 'list-circle-outline'
                    } else if (route.name == 'Add Todo') {
                        iconName = focused ? 'add-circle' : 'add-circle-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: theme.colors.primary['800'],
                tabBarInactiveTintColor: 'grey',
            })}>

            <Tab.Screen name='Todo List' component={TodoList} option={{ headerShown: false }} />
            <Tab.Screen name='Add Todo' component={FormTodo} option={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default function Container() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='TodoApp' component={MyTab} option={{ headerShown: false }} />
                <Stack.Screen name='Todo List' component={TodoList} option={{ headerShown: false }} />
                <Stack.Screen name='EditTodo' component={EditTodo} option={{ headerShown: false }} />
                <Stack.Screen name='Add Todo' component={FormTodo} option={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
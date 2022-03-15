import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchUser } from '../redux/actions/index'

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import FeedScreen from './main/Feed'
import ProfileScreen from './main/Profile'
import SocialScreen from './main/Social'
import ProgressScreen from './main/Progress'

const Tab = createMaterialBottomTabNavigator(); 

const EmptyScreen = () => {
    return(null)
}

export class Main extends Component {
    componentDidMount() {
       this.props.fetchUser();
    }
    render() {
        return (
            <Tab.Navigator initialRouteName="Feed" labeled={false}>
                <Tab.Screen name="Feed" component={FeedScreen} 
                listeners={({ navigation }) => ({
                    tabPress: event => {
                        event.preventDefault();
                        navigation.navigate("Feed", { userDataIsRetrieved: false})
                    }
                })}
                    options= {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="pizza" color={color} size={26}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
                <Tab.Screen name="Social" component={SocialScreen} 
                    options= {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="account-multiple" color={color} size={26}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
                <Tab.Screen name="Add" component={EmptyScreen}
                    listeners={({ navigation }) => ({
                        tabPress: event => {
                            event.preventDefault();
                            navigation.navigate("AddContainer")
                        }
                    })}
                    options= {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="camera" color={color} size={26}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
                <Tab.Screen name="Progress" component={ProgressScreen} 
                    options= {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="equalizer" color={color} size={26}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileScreen} 
                    options= {{
                        tabBarIcon: ({color, size}) => (
                            <MaterialCommunityIcons name="account-circle" color={color} size={26}/>
                        ), tabBarLabelPosition: 'below-icon'
                    }}
                />
            </Tab.Navigator>
        )
    }
}
// allows to freely access user's data within component
const mapStateToProps = (store) => ({
    currentUser: store.userState.currentUser
})
const mapDispatchProps = (dispatch) => bindActionCreators({fetchUser}, dispatch);

export default connect(mapStateToProps, mapDispatchProps)(Main);
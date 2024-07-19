import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createMaterialTopTabNavigator,
    MaterialTopTabNavigationOptions,
    MaterialTopTabNavigationEventMap
} from '@react-navigation/material-top-tabs'
import { withLayoutContext } from 'expo-router'
import { ParamListBase, TabNavigationState } from '@react-navigation/native'
import SubHeader from '@/components/subheader'
import { Fontisto } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const {Navigator } = createMaterialTopTabNavigator()


export const MaterialTopTabs = withLayoutContext<
MaterialTopTabNavigationOptions,
typeof Navigator,
TabNavigationState<ParamListBase>,
MaterialTopTabNavigationEventMap
>(Navigator)

const TopTabLayout = () => {
  return (
    <>
              <SubHeader />
              <MaterialTopTabs>
                <MaterialTopTabs.Screen name="sourcing" options={{
                    tabBarShowLabel:false,
                    tabBarIcon : ()=> <MaterialCommunityIcons name="open-source-initiative" size={24} color="black" />,
                    tabBarBadge : ()=><FontAwesome5 name="check-circle" size={16} color="green" />
                    
                }}/>
                <MaterialTopTabs.Screen name="personal" options={{
                    tabBarShowLabel:false,
                    tabBarIcon : ()=> <Fontisto name="persons" size={24} color="black" />,
                    tabBarBadge : ()=><FontAwesome5 name="check-circle" size={16} color="green" />

                }}/>
                <MaterialTopTabs.Screen name="kyc" options={{
                    tabBarShowLabel:false,
                    tabBarIcon : ()=> <Ionicons name="id-card-outline" size={24} color="black" />,
                    tabBarBadge : ()=><FontAwesome5 name="check-circle" size={16} color="green" />

                }}/>
                <MaterialTopTabs.Screen name="income" options={{
                    tabBarShowLabel:false,
                    tabBarIcon : ()=> <FontAwesome5 name="coins" size={24} color="black" />,
                    tabBarBadge : ()=><FontAwesome5 name="check-circle" size={16} color="green" />

                }}/>
                <MaterialTopTabs.Screen name="loan" options={{
                    tabBarShowLabel:false,
                    tabBarIcon : ()=> <Ionicons name="list-outline" size={24} color="black" />,
                    tabBarBadge : ()=><FontAwesome5 name="check-circle" size={16} color="green" />

                }}/>
                <MaterialTopTabs.Screen name="document" options={{
                    tabBarShowLabel:false,
                    tabBarIcon : ()=> <Ionicons name="document-attach-outline" size={24} color="black" />,
                    tabBarBadge : ()=><FontAwesome5 name="check-circle" size={16} color="green" />

                }}/>
                <MaterialTopTabs.Screen name="submission" options={{
                    tabBarShowLabel:false,
                    tabBarIcon : ()=> <FontAwesome name="upload" size={24} color="black" />,
                    tabBarBadge : ()=><FontAwesome5 name="check-circle" size={16} color="green" />

                }}/>

              </MaterialTopTabs>

    </>
  )
}

export default TopTabLayout

const styles = StyleSheet.create({})
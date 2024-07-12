import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import InboxCard from './InboxCard';

export type DashboardProps = {
    otherStyle:string;
}
const Dashboard = ({otherStyle}:DashboardProps) => {
  return (
    <View className={`
     flex flex-column justify-center
     
    `}>
      <View className='flex flex-row w-[85vw] justfify-center items-center'>
          <InboxCard 
          title="Assigned Leads"
          count={0}
          icon='copy-outline'
          leftMarginColor='bg-green'
          subtitle='All assigned leads comes here'
          />  
      </View>
      

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
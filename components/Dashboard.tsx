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
      <View className='flex flex-column w-[85vw] justfify-center items-center'>
          <InboxCard 
          title="Assigned Leads"
          count={12}
          icon='copy-outline'
          leftMarginColor='bg-green'
          countStyle='text-green text-2xl'
          subtitle='All assigned leads comes here'
          />  

        <InboxCard 
          title="Incomplete Leads"
          count={6}
          icon='notifications-outline'
          leftMarginColor='bg-purple'
          countStyle='text-purple text-2xl'
          subtitle='All incomplete leads comes here'
          />  

<InboxCard 
          title="Completed Leads"
          count={16}
          icon='checkmark-done'
          leftMarginColor='bg-yellow'
          countStyle='text-secondary text-xl'
          subtitle='All completed leads comes here'
          />  
          
      </View>
      

    </View>
  )
}

export default Dashboard

const styles = StyleSheet.create({})
import { FlatList, StyleSheet, Text, View, Image, StatusBar, RefreshControl } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { getAllPosts } from '../../lib/appwrite'
import useAppwrite from '../../lib/useAppwrite'
import VideoCard from '../../components/VideoCard'
const Home = () => {
  const {data,refetch,isLoading} = useAppwrite(getAllPosts)
  const [refreshing, setRefreshing] = useState(false)

  const onRefresh = async () => {
    setRefreshing(true)
    await refetch()
    setRefreshing(false)
  }
  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={data.documents}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => {
          return (<VideoCard  video={item}/>)
        }}

        ListHeaderComponent={() => {
          return (
            <View className="my-6 px-4">
              <View className="flex-row mb-6 justify-between items-start">
                <View>
                  <Text className="font-psemibold text-sm text-gray-100">Welcome Back...!</Text>
                  <Text className="font-pregular text-2xl text-bold text-white">LMS</Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    resizeMode="contain"
                    className="w-9 h-10"
                  />
                </View>
              </View>
              <SearchInput placeholder="Search your leads here" />
              <Text className="text-gray-100 text-lg mb-3 my-3 text-pregular">Recent leads</Text>
              <Trending
                posts={[{ id: 1 }, { id: 2 }, { id: 3 }] ?? []}
              />
            </View>
          )
        }}

        ListEmptyComponent={() => {
          return (
            <EmptyState
              title="No Leads Found"
              subtitle="Create a new Lead..!!"
            />
          )
        }}
        refreshControl={<RefreshControl
          tintColor="#FF9C01"
          refreshing={refreshing}
        />}

      />

    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})
import { Tabs } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import TabBar from '@/components/TabBar'

export default function Layout() {
  return (
    
        <Tabs
        screenOptions={{ 
          headerShown:false
         }}
          tabBar={props=> <TabBar {...props} 
        />}
    >
        <Tabs.Screen
            name="index"
            options={{
                title: "Home"
            }}
        />
        <Tabs.Screen
            name="maps"
            options={{
                title: "Maps"
            }}
        />
        <Tabs.Screen
            name="bookmark"
            options={{
                title: "bookmark"
            }}
        />
        <Tabs.Screen
            name="profile"
            options={{
                title: "Profile"
            }}
        />
     
    </Tabs>
  );
}


 {/* 
   <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: 60,
          paddingBottom:10,
        },
        tabBarActiveTintColor: '#008080',
      }}
    > 
  <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <AntDesign name="search1" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={24} color={color} />,
        }}
      /> 
      </Tabs>
      */}
import React from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Pressable, StyleSheet } from 'react-native';

export const AddVouchBottomBar = ({ state, descriptors, navigation }) => {
  return (
    <>
      <View
        style={styles.bottomBar}
      >
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon = state.index === index ? options.activeTabBarIcon : options.tabBarIcon;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <Pressable
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center", flexDirection: "column" }}
            >
              <Icon />
            </Pressable>
          );
        })}
      </View>
      <SafeAreaView style={{ backgroundColor: "rgba(0,0,0,0.1)" }} />
    </>
  );
};
  

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    paddingVertical: 15,
    backgroundColor: "rgba(0,0,0,0.06)",
    shadowRadius: 1.3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
});
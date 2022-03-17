import React, { useState } from "react";
import { View, Text, TouchableOpacity, SafeAreaView, Pressable, StyleSheet, Platform } from 'react-native';
import fonts from "../../utils/fonts";

export const BottomBar = ({ state, descriptors, navigation }) => {

  const [vouchIconPossision, setVouchIconPossision] = useState({});
  const [tryIconPossision, setTryIconPossision] = useState({});
  const [tabBarPossition, setTabBarPossition] = useState({});

  global.tryIconPossision = tryIconPossision
  global.vouchIconPossision = vouchIconPossision
  global.tabBarPossition = tabBarPossition

  return (
    <>
      <View
        style={styles.bottomBar}
        onLayout={(event) => {
          setVouchIconPossision(
            event.nativeEvent.layout
          )
        }}
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

          const showBadge = () => {
            return <View style={styles.badge}><Text style={styles.badgeText}>{options.count < 10 ? options.count : <Text style={{ ...styles.badgeText, fontSize: 11 }}>9+</Text>}</Text></View>
          }

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // console.log("route nmae",route.name)
          return (
            <Pressable
              onLayout={(event) => {
                if (index == 2) {
                  setTabBarPossition(
                    event.nativeEvent.layout
                  )
                }
                if (index == 3) {
                  setTryIconPossision(
                    event.nativeEvent.layout
                  )
                }
              }}
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: "center", flexDirection: "column" }}
            >
              <Icon width={30} height={30} style={{ marginLeft: 3 }} />
              {(route.name == "Alerts" && options?.count && options?.count !== null) ? showBadge() : <></>}
              <Text style={{ fontWeight: "400", marginTop: -2 }}>{label}</Text>
            </Pressable>
          );
        })}
      </View>
      <SafeAreaView style={{ backgroundColor: "white" }} />
    </>
  );
};


const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: "row",
    paddingTop: 15,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 1.3,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },
  badge: { position: "absolute", right: 22, height: 18, width: 18, backgroundColor: "red", borderRadius: 25, alignItems: "center", justifyContent: "center" },
  badgeText: { color: "white", fontSize: 12, fontFamily: fonts.SanFrancisco.Bold }
})
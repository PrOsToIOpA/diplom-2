import React, {useRef} from 'react';
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import {calcHeight, calcWidth} from '../../utils/dimensions';
import LinearGradient from 'react-native-linear-gradient';
import {linearGradient, white} from '../../utils/constants/colors';

interface ICustomBarProps extends BottomTabBarProps {
  containerStyle?: StyleProp<ViewStyle>;
  barStyles?: StyleProp<ViewStyle>;
}

const CustomBottomBar = ({
  state,
  descriptors,
  navigation,
  containerStyle,
  barStyles,
}: ICustomBarProps) => {
  const mainViewRef = useRef<View>(null);
  return (
    <View style={styles.background} ref={mainViewRef}>
      <View style={[styles.container, containerStyle]}>
        {state.routes.map((route, index) => {
          const {options} = descriptors[route.key];

          const isFocused = state.index === index;
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            console.log('LONG PRESS');
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const icon =
            options.tabBarIcon &&
            options.tabBarIcon({
              color: 'NO USED CURRENTLY',
              size: calcHeight(22),
              focused: isFocused,
            });

          const mainBackgroundColor: string =
            // @ts-ignore @todo make it right with ts, need to change options interface
            options.backgroundColorAll && options.backgroundColorAll;
          mainBackgroundColor &&
            isFocused &&
            mainViewRef?.current?.setNativeProps({
              backgroundColor: mainBackgroundColor,
            });
          !mainBackgroundColor &&
            isFocused &&
            mainViewRef?.current?.setNativeProps({
              backgroundColor: white,
            });

          const noIcon: boolean =
            // @ts-ignore @todo make it right with ts, need to change options interface
            options.noIcon && options.noIcon;

          return noIcon ? null : (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? {selected: true} : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={async () => {
                onPress();
              }}
              onLongPress={onLongPress}
              style={[styles.bar, barStyles]}
              key={`${index}`}
            >
              {isFocused ? (
                <LinearGradient
                  style={styles.iconContainer}
                  start={{x: 0, y: 1}}
                  end={{x: 1, y: 0.5}}
                  locations={linearGradient.main.locations}
                  colors={linearGradient.main.colors}
                >
                  {icon}
                </LinearGradient>
              ) : (
                <View style={[styles.iconContainer]}>{icon}</View>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 0.08,
    backgroundColor: white,
    paddingHorizontal: calcWidth(20),
    paddingBottom: calcWidth(15),
    paddingTop: calcWidth(2),
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    padding: calcWidth(8),
    borderRadius: 999,
    backgroundColor: white,
    shadowColor: 'rgba(0,0,0,0.1)',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 1,
    shadowRadius: 20,
  },
  bar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    width: calcHeight(35),
    height: calcHeight(35),
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CustomBottomBar;

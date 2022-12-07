import React from 'react';
import {View, ViewStyle} from 'react-native';
import {iconsMap} from '../../../assets/icons';

interface IIcon {
  name: string | undefined;
  containerStyle?: ViewStyle;
}

const Icon = ({name, containerStyle, ...rest}: IIcon) => {
  // @ts-ignore
  const IconComponent = iconsMap[name];

  return (
    <View style={containerStyle}>
      <IconComponent {...rest} />
    </View>
  );
};

export default Icon;

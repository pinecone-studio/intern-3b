import { Image, ImageBackground, Text, View } from 'react-native';
import { images } from '../../constants/images';

const TabIcon = ({
  iconName,
  focused,
  icon,
}: {
  iconName: string;
  focused: boolean;
  icon: any;
}) => {
  if (focused) {
    return (
      <ImageBackground
        source={images.highlight}
        className="flex flex-row w-full flex-1 min-w-[112px] min-h-14 mt-4 justify-center items-center rounded-full overflow-hidden "
      >
        <Image source={icon} className="size-5" />
        <Text className="text-black text-base font-semibold ml-2">
          {iconName}
        </Text>
      </ImageBackground>
    );
  }
  else{
    return(
        <View>
            
        </View>
    )
  }
};

export default TabIcon;

import { View, Text, TouchableOpacity } from 'react-native';
import React, { ReactNode } from 'react';

const Navbar = ({
  title,
  onBack,
  actions,
}: {
  title: string;
  onBack?: () => void;
  actions?: ReactNode;
}) => {
  return (
    <View className="sticky top-0 z-10 bg-[#262626] border-b border-[#404040]">
      <View className="flex flex-row items-center justify-between h-14 px-4">
        <View className="flex flex-row items-center gap-2 flex-1 min-w-0">
          {onBack && (
            <TouchableOpacity
              onPress={onBack}
              accessibilityLabel="Буцах"
              className="p-0 -ml-2 rounded-[8px]"
              activeOpacity={0.7}
            >
              <Text>v</Text>
            </TouchableOpacity>
          )}
          <Text
            className="font-semibold text-base text-[#ffffff]"
            numberOfLines={1}
          >
            {title}
          </Text>
        </View>
        {actions && (
          <View className="flex items-center gap-2 flex-shrink-0">
            {actions}
          </View>
        )}
      </View>
    </View>
  );
};

export default Navbar;

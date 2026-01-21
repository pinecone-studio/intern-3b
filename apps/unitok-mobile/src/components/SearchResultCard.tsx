import { View, Text } from 'react-native';
import React from 'react';
import { Course } from '../lib/types';

const SearchResultCard = ({
  course,
  searchType,
}: {
  course: Course;
  searchType: 'course' | 'professor';
}) => {
  return (
    <View className="flex items-center justify-between">
      <View className="flex-1">
        <Text className="text-sm font-semibold text-[#ededed] mb-0.5">
          {course.name}
        </Text>
        {searchType === 'professor' && (
          <Text className="text-xs text-[#7f7f7f]">{course.professor}</Text>
        )}
      </View>
      <View className="flex items-center gap-1 ml-3">
        {/* <Star className="h-4 w-4 fill-[#d6c54b] text-[#d6c54b]" /> */}
        <Text className="text-sm font-semibold text-[#d6c54b]">
          {course.rating.toFixed(1)}
        </Text>
      </View>
    </View>
  );
};

export default SearchResultCard;

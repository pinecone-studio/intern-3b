import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

interface SearchFiltersProps {
  searchType: 'course' | 'professor';
  onChange: (type: 'course' | 'professor') => void;
}

export function SearchByFilters({ searchType, onChange }: SearchFiltersProps) {
  return (
    <View className="flex-row space-x-4">
      <TouchableOpacity
        onPress={() => onChange('course')}
        activeOpacity={0.7}
        className={`flex-row items-center space-x-2 ${
          searchType === 'course'
            ? 'text-[#FFFFFF] border-[#D65A3A]'
            : 'text-[#999999] border-[#999999]'
        } border-2 rounded-full px-2 py-1`}
      >
        <View
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            searchType === 'course' ? 'border-[#D65A3A]' : 'border-[#999999]'
          }`}
        >
          {searchType === 'course' && (
            <View className="w-2 h-2 rounded-full bg-[#D65A3A]" />
          )}
        </View>
        <Text className="text-sm text-current">Хичээл</Text>
      </TouchableOpacity>

      {/* Professor Button */}
      <TouchableOpacity
        onPress={() => onChange('professor')}
        activeOpacity={0.7}
        className={`flex-row items-center space-x-2 ${
          searchType === 'professor'
            ? 'text-[#FFFFFF] border-[#D65A3A]'
            : 'text-[#999999] border-[#999999]'
        } border-2 rounded-full px-2 py-1`}
      >
        <View
          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
            searchType === 'professor' ? 'border-[#D65A3A]' : 'border-[#999999]'
          }`}
        >
          {searchType === 'professor' && (
            <View className="w-2 h-2 rounded-full bg-[#D65A3A]" />
          )}
        </View>
        <Text className="text-sm text-current">Багш</Text>
      </TouchableOpacity>
    </View>
  );
}

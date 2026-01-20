import { Text, TextInput, View } from 'react-native';
import Navbar from '../../componentsr/Navbar';
import { useRef, useState } from 'react';
import { useRouter } from 'expo-router';
import { useSearchParams } from 'expo-router/build/hooks';
import { SearchByFilters } from '../../componentsr/SearchByFilters';
import SearchResultsSection from '../../componentsr/SearchResultsSection';
import { mockCourses } from '../../lib/mockDatas';

export default function App() {

  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialType =
    (searchParams.get('type') as 'course' | 'professor') || 'course';
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchType, setSearchType] = useState<'course' | 'professor'>(
    initialType,
  );
  const searchInputRef = useRef(null);

  const filteredCourses = mockCourses.filter((course) => {
    const query = searchQuery.toLowerCase();
    if (searchType === 'course') {
      return course.name.toLowerCase().includes(query);
    } else {
      return course.professor.toLowerCase().includes(query);
    }
  });

  console.log(searchQuery, 'input value');

  return (
    <View className=" bg-[#1e1e1e] flex flex-col min-h-screen max-w-md ">
      <Navbar title={'Хайх'} />
      <View className="px-4 py-2 bg-card border-b border-border">
        <View className='mb-2'>
          <TextInput
            ref={searchInputRef}
            className="pl-10 h-10 bg-background border-[#404040] text-foreground rounded-lg"
            placeholder="Хайх..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            keyboardType="default"
            returnKeyType="search"
            autoCorrect={false}
            underlineColorAndroid="transparent"
          />
        </View>
        <SearchByFilters searchType={searchType} onChange={setSearchType} />
      </View>
      <SearchResultsSection
        filteredCourses={filteredCourses}
        searchType={searchType}
      />
    </View>
  );
}

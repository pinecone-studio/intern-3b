import { View, FlatList } from 'react-native';
import SearchResultLink from './SearchResultLink';
import { Course } from '../lib/types';

const SearchResultsSection = ({
  filteredCourses,
  searchType,
}: {
  filteredCourses: Course[];
  searchType: 'course' | 'professor';
}) => {
  return (
    <View className="flex-1 overflow-y-auto pb-20">
      {filteredCourses.length === 0 ? (
        <View></View>
      ) : (
        <FlatList
          data={filteredCourses}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <SearchResultLink course={item} searchType={searchType} />
          )}
        />
      )}
    </View>
  );
};

export default SearchResultsSection;

//  <main className="flex-1 overflow-y-auto pb-20">
//    {filteredCourses.length === 0 ? (
//      <div className="flex flex-col items-center justify-center h-64 px-4 text-center">
//        <Search className="h-12 w-12 text-muted-foreground/40 mb-3" />
//        <h3 className="text-sm font-semibold text-foreground mb-1">
//          Үр дүн олдсонгүй
//        </h3>
//        <p className="text-xs text-muted-foreground">
//          Өөр түлхүүр үгээр хайж үзнэ үү
//        </p>
//      </div>
//    ) : (
//      <div className="divide-y divide-border">
//        {filteredCourses.map((course) => (
//          <button
//            key={course.id}
//            onClick={() => handleSelectCourse(course)}
//            className="w-full px-4 py-3 text-left hover:bg-accent/50 transition-colors active:bg-accent"
//          >
//            <CourseSearchResultItem course={course} searchType={searchType} />
//          </button>
//        ))}
//      </div>
//    )}
//  </main>;

import { Alert } from 'react-native';
import { ThemedView } from './ThemedView';
import { Link } from 'expo-router';
import SearchResultCard from './SearchResultCard';
import { Course } from '../lib/types';

const SearchResultLink = ({
  course,
  searchType,
}: {
  course: Course;
  searchType: 'course' | 'professor';
}) => {
  return (
    <ThemedView className="flex gap-2 mb-2">
      <Link href="/modal">
        <Link.Trigger>
          <SearchResultCard course={course} searchType={searchType} />
        </Link.Trigger>
        <Link.Preview />
        <Link.Menu>
          <Link.MenuAction
            title="Action"
            icon="cube"
            onPress={() => Alert.alert('Action pressed')}
          />
          <Link.MenuAction
            title="Share"
            icon="square.and.arrow.up"
            onPress={() => Alert.alert('Share pressed')}
          />
          <Link.Menu title="More" icon="ellipsis">
            <Link.MenuAction
              title="Delete"
              icon="trash"
              destructive
              onPress={() => Alert.alert('Delete pressed')}
            />
          </Link.Menu>
        </Link.Menu>
      </Link>
    </ThemedView>
  );
};

export default SearchResultLink;

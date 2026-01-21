import {
  mockCourses,
  mockReviews,
  // mockTicketHistory,
  // calculateTotalTickets,
} from '../../lib/mock-data';

import { HomeFeed } from './_components/HomeFeed';
import { AppHeader } from '@/components/AppHeader';
import { BottomNav } from '@/components/BottomNav';
import TicketButton from './_components/TicketButton';
import ModeToggleButton from './_components/ModeToggleButton';
import SearchButton from './_components/SearchButton';

export default function HomePage() {
  // const currentTickets = calculateTotalTickets(mockTicketHistory);

  // if (!isAuthenticated) {
  //   return <Login onLogin={() => setIsAuthenticated(true)} />;
  // }

  return (
    <div className="flex flex-col min-h-screen bg-background max-w-md mx-auto">
      <AppHeader
        title="unitok"
        actions={
          <>
            <TicketButton url="/ticket-history" />
            <ModeToggleButton />
            <SearchButton />
          </>
        }
      />

      <main className="flex-1 overflow-y-auto pb-20">
        <HomeFeed reviews={mockReviews} courses={mockCourses} />
      </main>

      <BottomNav activeId="home" />
    </div>
  );
}

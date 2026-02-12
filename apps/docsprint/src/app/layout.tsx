import './global.css';
import ApolloWrapper from './lib/ApolloWrapper';

export const metadata = {
  title: 'docSprint',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}

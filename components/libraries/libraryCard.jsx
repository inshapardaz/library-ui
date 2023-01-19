import Link from 'next/link';

// 3rd Party Libraries
import { Card, Placeholder } from 'semantic-ui-react'

function LoadingLibraryCard () {
  return (<Placeholder>
    <Placeholder.Header image>
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Header>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>)
} 

function LibraryCard({ library, loading = false }) {
    if (loading) {
        return <LoadingLibraryCard />;
    }

    return (<Card
        as={Link}
        href={`/libraries/${library.id}`}
        header={library.name}
        meta={library.language}
        description={library.description}
      />);
}

export default LibraryCard;
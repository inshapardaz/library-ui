import Link from 'next/link';

// 3rd Party Libraries
import { Card, Placeholder, Image } from 'semantic-ui-react'

// Local Imports
import ApiContainer from "../common/ApiContainer";

// --------------------------------------------------

function BookCard({ libraryId, book, loading = false }) {
    if (loading) {
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

    return (<Card
        as={Link}
        href={`/libraries/${libraryId}/books/${book.id}`}
      >
         
        <Card.Content>
          <Card.Header>{book.title}</Card.Header>
           <Card.Meta>
            <span className='date'>Joined in 2015</span>
           </Card.Meta>
           <Card.Description>
              {book.description}
           </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            22 Friends
          </a>
        </Card.Content>
      </Card>);
}

export default BookCard;
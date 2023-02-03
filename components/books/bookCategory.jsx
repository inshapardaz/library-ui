import { Space, Tag } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FaTags } from 'react-icons/fa';

// ------------------------------------------------

export function BookCategory({ libraryId, book }) {
  if (book && book.categories && book.categories.length > 0) 
  {
    const list = book.categories.map(c => (<Tag key={c.id}>
      <Link href={`/libraries/${libraryId}/books?categories=${c.id}`}>{c.name}</Link>
    </Tag>));

    return (<Space wrap align="start">
      <FaTags />
      {list}
    </Space>);
  }

  return null;
}

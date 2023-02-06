import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTranslations } from "next-intl";
import { useSession } from "next-auth/react";
import Link from "next/link";

// 3rd party imports
import { Menu } from "antd";
import { FaTags, FaTag, FaRegHeart, FaBookOpen } from "react-icons/fa";

// Local Imports
import libraryService from "@/services/libraryService";
import { MdNewReleases } from "react-icons/md";

// --------------------------------------

function BooksSideBar() {
    const t = useTranslations();
    const router = useRouter();
    const { status } = useSession();
    const [categories, setCategories] = useState({});
    const { libraryId, 
      categories : selectedCategory, 
      sortBy, 
      sortDirection, 
      favorites, 
      read 
    } = router.query

    useEffect(() => { 
      const loadCategories = () => {
        libraryService.getCategories(libraryId)
        .then(res => setCategories(res))
        .catch((e) => {
          console.error(e)
          message.error(t('categories.loadingError'))
        })
      }
  
        if (libraryId) {
            loadCategories();
      }
    }, [libraryId, t]);

    let catItems = categories && categories.data && categories.data.map(c => ({
      label : (
        <Link href={`/libraries/${libraryId}/books?categories=${c.id}`}>
            {c.name}
          </Link>
        ),
        key: `side-bar-category-${c.id}`,
        icon: <FaTag />,
      }))
      
    catItems && catItems.unshift({
      label : (
        <Link href={`/libraries/${libraryId}/books`}>
          {t('categories.all')}
        </Link>
      ),
      key: `side-bar-category-`,
      icon: <FaTag />,
    });

    const items =  [{
      key: 'sidebar-bar-latest',
      icon: <MdNewReleases />,
      label: (<Link href={`/libraries/${libraryId}/books?sortBy=DateCreated&sortDirection=descending`}>
        {t('books.latest.title')}
      </Link>)
      },{
        key: 'side-bar-categories',
        icon: <FaTags />,
        label: t('categories.title'),
        children: catItems
      }];
    
    if (status === "authenticated") 
    {
      items.splice(1, 0, {
        key: 'sidebar-bar-favorites',
        icon: <FaRegHeart />,
        label: (<Link href={`/libraries/${libraryId}/books?favorites=true`}>
            {t('books.favorites.title')}
          </Link>)
      });

      items.splice(2, 0, {
        key: 'sidebar-bar-read',
        icon: <FaBookOpen />,
        label: (<Link href={`/libraries/${libraryId}/books?read=true`}>
          {t('books.read.title')}
        </Link>)
      });
    }

    let selection = [];
    if (selectedCategory) {
      selection.push(`side-bar-category-${selectedCategory}`);
    } else if ( sortBy && sortBy.toLowerCase() ==='datecreated' && 
                sortDirection && sortDirection.toLowerCase()===`descending`) {
      selection.push('sidebar-bar-latest');
    } else if (favorites) {
      selection.push('sidebar-bar-favorites');
    } else if (read) {
      selection.push('sidebar-bar-read');
    }

    return (<Menu
        mode="inline"
        defaultSelectedKeys={selection}
        defaultOpenKeys={['side-bar-categories']}
        style={{ height: '100%' }}
        items={items}
      />);
}

export default BooksSideBar;
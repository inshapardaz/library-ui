import { useSelector } from "react-redux";

// 3rd party libraries
import { Spin, Typography } from "antd";

// Local Imports
import styles from '../../styles/common.module.scss'
import ContentsContainer from '../../components/layout/contentContainer';
import HeroImage from "../../components/heroImage";
import SearchBox from "../../components/searchBox";
import LatestBooks from "../../components/books/latestBooks";
import { getLibrary, getLibraryStatus }  from '../../features/libraries/librarySlice'

// -------------------------------------------------------

const LibraryHome = () => {
  const library = useSelector(getLibrary)
  const libraryStatus = useSelector(getLibraryStatus)

  if (libraryStatus === 'loading') {
    return <Spin />
  }

  return (<>
    <HeroImage>
      <Typography.Title level={1} className={styles.hero__title} >{library ? library.name : ''}</Typography.Title>
      <div className={styles.hero__content}>
        <SearchBox />
      </div>
    </HeroImage>
    <ContentsContainer>
      <LatestBooks />
    </ContentsContainer>
  </>);
}

export default LibraryHome;
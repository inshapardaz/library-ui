
// Ui Library Imports
import { Center, SegmentedControl } from "@mantine/core";
import { useLocalStorage } from '@mantine/hooks';

// Local imports
import { IconReaderViewScroll, IconReaderViewSinglePage, IconReaderViewDoublePage } from '@/components/icon'
//-----------------------------------
const ReadViewToggle = () => {
    const [readerView, setReaderView] = useLocalStorage({
        key: "reader-view-type",
        defaultValue: 'scroll',
    });

    const layouts = [{
        value: 'scroll',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderViewScroll />
            </Center>
        ),
    },
    {
        value: 'singlePage',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderViewSinglePage />
            </Center>
        ),
    },
    {
        value: 'doublePage',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderViewDoublePage />
            </Center>
        ),
    }]

    return <SegmentedControl size="lg" onChange={setReaderView} value={readerView} data={layouts} />
}

export default ReadViewToggle;
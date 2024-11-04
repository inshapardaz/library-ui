import PropTypes from 'prop-types';

// Ui Library Imports
import { Center, rem, SegmentedControl } from "@mantine/core";

// Local imports
import { IconReaderViewScroll, IconReaderViewSinglePage, IconReaderViewDoublePage } from '@/components/icon'
//-----------------------------------
const ReadViewToggle = ({ value, onChange }) => {
    const layouts = [{
        value: 'scroll',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderViewScroll style={{ width: rem(16), height: rem(16) }} />
            </Center>
        ),
    },
    {
        value: 'singlePage',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderViewSinglePage style={{ width: rem(16), height: rem(16) }} />
            </Center>
        ),
    },
    {
        value: 'doublePage',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderViewDoublePage style={{ width: rem(16), height: rem(16) }} />
            </Center>
        ),
    }]

    return <SegmentedControl size="md" onChange={onChange} value={value} data={layouts} />
}

ReadViewToggle.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default ReadViewToggle;
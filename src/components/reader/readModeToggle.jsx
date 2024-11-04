import PropTypes from 'prop-types';

// Ui Library Imports
import { Center, rem, SegmentedControl } from "@mantine/core";

// Local imports
import { IconReaderImage, IconReaderText } from '@/components/icon'
//-----------------------------------
const ReadModeToggle = ({ value, onChange }) => {
    const layouts = [{
        value: 'image',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderImage style={{ width: rem(16), height: rem(16) }} />
            </Center>
        ),
    },
    {
        value: 'text',
        label: (
            <Center style={{ gap: 10 }}>
                <IconReaderText style={{ width: rem(16), height: rem(16) }} />
            </Center>
        ),
    }]

    return <SegmentedControl size="md" onChange={onChange} value={value} data={layouts} />
}

ReadModeToggle.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func
}

export default ReadModeToggle;
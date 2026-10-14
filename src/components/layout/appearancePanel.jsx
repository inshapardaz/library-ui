import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { SegmentedControl, Stack, Text } from '@mantine/core';

// Local Imports
import { selectedUrduFont, setUrduFont } from '@/store/slices/uiSlice';
//----------------------------------------------

// The Urdu typeface choice (Nastaleeq/Naskh), remembered in local storage. The app's colours are
// fixed by the paper/spine design, so there's no accent picker here any more.
const AppearancePanel = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const urduFont = useSelector(selectedUrduFont);

    return (
        <Stack gap="md" miw={220}>
            <div>
                <Text fw={600} size="sm" mb="xs">{t('appearance.urduFont')}</Text>
                <SegmentedControl
                    fullWidth
                    value={urduFont}
                    onChange={(value) => dispatch(setUrduFont(value))}
                    data={[
                        { value: 'nastaleeq', label: t('appearance.nastaleeq') },
                        { value: 'naskh', label: t('appearance.naskh') },
                    ]}
                />
            </div>
        </Stack>
    );
};

export default AppearancePanel;

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// Ui Library Imports
import { ColorSwatch, Group, SegmentedControl, Stack, Text, UnstyledButton } from '@mantine/core';

// Local Imports
import { ACCENT_PRESETS } from '@/theme/accent';
import { selectedAccent, selectedUrduFont, setAccent, setUrduFont } from '@/store/slices/uiSlice';
import { IconCheck } from '@/components/icon';
//----------------------------------------------

// The accent colour and Urdu typeface choices. Both are remembered in local storage; the accent
// recolours every Mantine component through the generated palette (see theme/accent.js).
const AppearancePanel = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const accent = useSelector(selectedAccent);
    const urduFont = useSelector(selectedUrduFont);
    const isPreset = ACCENT_PRESETS.some((preset) => preset.hex === accent.toLowerCase());

    return (
        <Stack gap="md" miw={220}>
            <div>
                <Text fw={600} size="sm" mb="xs">{t('appearance.accent')}</Text>
                <Group gap="xs" role="radiogroup" aria-label={t('appearance.accent')}>
                    {ACCENT_PRESETS.map(({ key, hex }) => (
                        <UnstyledButton
                            key={key}
                            role="radio"
                            aria-checked={accent.toLowerCase() === hex}
                            aria-label={t(`appearance.colors.${key}`)}
                            onClick={() => dispatch(setAccent(hex))}
                        >
                            <ColorSwatch color={hex} size={26} withShadow={accent.toLowerCase() === hex}>
                                {accent.toLowerCase() === hex && <IconCheck height={14} style={{ color: 'white' }} />}
                            </ColorSwatch>
                        </UnstyledButton>
                    ))}
                    <input
                        type="color"
                        value={accent}
                        aria-label={t('appearance.customAccent')}
                        title={t('appearance.customAccent')}
                        onChange={(event) => dispatch(setAccent(event.target.value))}
                        style={{
                            width: 26, height: 26, padding: 0, border: 0, background: 'none', cursor: 'pointer',
                            outline: isPreset ? 'none' : '2px solid var(--mantine-color-accent-6)',
                            outlineOffset: 2,
                        }}
                    />
                </Group>
            </div>
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

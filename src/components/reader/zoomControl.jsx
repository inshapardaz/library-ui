import PropTypes from 'prop-types';

// UI library import
import { ActionIcon, Button } from "@mantine/core";

// Local Import
import { IconZoomIn, IconZoomOut } from '@/components/icon';
//----------------------------------------
const minZoom = 0;
const maxZoom = 300;
const ZoomControl = ({ value, onChange }) => {
    const onZoomIn = () => {
        if (value < maxZoom) {
            onChange(value + 10);
        }
    }
    const onZoomOut = () => {
        if (value > minZoom) {
            onChange(value - 10);
        }
    }
    return (
        <Button.Group>
            <ActionIcon size={36} variant="default" disabled={value > maxZoom} onClick={onZoomIn}><IconZoomIn /></ActionIcon>
            <ActionIcon size={36} variant="default" disabled={value < minZoom} onClick={onZoomOut}><IconZoomOut /></ActionIcon>
        </Button.Group>);
}

ZoomControl.propTypes = {
    value: PropTypes.number,
    onChange: PropTypes.func,
}

export default ZoomControl
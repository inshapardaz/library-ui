import { Card, Empty, Result  } from "antd";

// Local Import 
import styles from '@/styles/common.module.scss';

// ------------------------------------------------

function ApiContainer ({ title, 
    error, errorTitle, errorIcon, errorAction, 
    busy, emptyImage, emptyDescription, emptyContent,
    empty, actions, bordered = true,
    children}) {
    const content = error ? <Result status='error' title={errorTitle} icon={errorIcon} extra={errorAction} /> : 
                    !!empty ? <Empty image={emptyImage} description={emptyDescription} >{emptyContent}</Empty>  :
                    busy ? null: children;
    return (<Card title={title} extra={actions} bordered={bordered}
        className={styles['api_container']} 
        loading={busy}
        >
        { content }
    </Card>);
}

export default ApiContainer;
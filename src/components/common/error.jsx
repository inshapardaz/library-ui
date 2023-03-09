// 3rd party libraries
import { Button, Result } from "antd";

// ---------------------------------

const Error = () => {
    return (<Result
        status="warning"
        title="There are some problems with your operation."
        extra={
          <Button type="primary" key="console">
            retry
          </Button>
        }
      />)
}

export default Error;
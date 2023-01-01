import PropTypes from 'prop-types'

import DesktopHeader from './desktopHeader'
import MobileHeader from './mobileHeader'

const ResponsiveContainer = ({ children }) => (
  <>
    <DesktopHeader></DesktopHeader>
    <MobileHeader></MobileHeader>
    {children}
  </>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer;
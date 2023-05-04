import PropTypes from 'prop-types';
import { Alert as AlertAntd } from 'antd';

Alert.propTypes = {
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error']).isRequired,
  message: PropTypes.string.isRequired,
};

function Alert({ type, message }) {
  return <AlertAntd message={message} type={type} showIcon closable />;
}

export default Alert;

import PropTypes from 'prop-types';

const HeaderContainer = ({ children }) => {
  return <div>Header {children}</div>;
};

HeaderContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default HeaderContainer;

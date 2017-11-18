import React from 'react';
import PropTypes from 'prop-types';

const Dropdown = ({options, onChange}) => {
  return (
    <select onChange={onChange}>
      {options.map(({value, label}, index) => <option key={value} value={value}>{label}</option>)}
    </select>
  );
};

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  onChange: PropTypes.func.isRequired
};

export default Dropdown;
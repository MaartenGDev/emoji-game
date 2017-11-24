import React from 'react'
import PropTypes from 'prop-types'

const Dropdown = ({options, selectedValue, onChange}) => {
  return (
    <section>
      <label htmlFor="teamPicker" className="hidden">Team</label>
      <select onChange={onChange} value={selectedValue} id="teamPicker"
              className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded">
        {options.map(({value, label}, index) => <option key={value} value={value}>{label}</option>)}
      </select>
    </section>
  )
}

Dropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  selectedValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]).isRequired,
  onChange: PropTypes.func.isRequired
}

export default Dropdown
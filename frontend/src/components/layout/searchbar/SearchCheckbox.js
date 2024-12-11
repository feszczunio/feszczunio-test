import React from 'react';
export const SearchCheckbox = (props) => {
  const { label, isChecked, onChange } = props;
  return (
    <label className="archive-search__checkbox">
      <input
        type="checkbox"
        name={label}
        checked={isChecked}
        onChange={onChange}
      />
      {label}
    </label>
  );
};

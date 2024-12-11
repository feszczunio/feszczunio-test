import React from 'react';
export const InputField = (props) => {
  const { value, onChange } = props;
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder="Search..."
      className="archive-search__input"
    />
  );
};

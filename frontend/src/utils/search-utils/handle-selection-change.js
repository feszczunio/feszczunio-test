export const handleSelectionChange = (selected, setSelected) => (item) => {
  setSelected((prevItems) =>
    prevItems.includes(item)
      ? prevItems.filter((i) => i !== item)
      : [...prevItems, item],
  );
};

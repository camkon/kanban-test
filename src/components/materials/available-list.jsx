import React, { useEffect, useState } from 'react';

const AvailableList = ({ items, setData, selectedHeaders, selectedItems, setSelectedHeaders, setSelectedItems }) => {

  const [openIndexes, setOpenIndexes] = useState([]);
  

  const toggleAccordion = index => {
    setOpenIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };
  
  const toggleHeaderSelection = index => {
    setSelectedHeaders(prev => prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]);
    setSelectedItems(prev => {
      const newItems = { ...prev };
      items[index].items.forEach((_, itemIndex) => {
        newItems[`${index}-${itemIndex}`] = !selectedHeaders.includes(index);
      });
      return newItems;
    });
  };
  
  const toggleItemSelection = (headerIndex, itemIndex) => {
    const key = `${headerIndex}-${itemIndex}`;
    setSelectedItems(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleTransfer = () => {
    const selectedData = items.reduce((acc, item, index) => {

      // Filtering out the selected subitems
      const selectedSubItems = item.items.filter(
        (base, itemIndex) => selectedItems[`${index}-${itemIndex}`]
      );

      // If the header is selected or any subitem is selected, add to the selected data
      if (selectedHeaders.includes(index) || selectedSubItems.length > 0) {
        acc.push({
          id: item.id,
          name: item.name,
          items: selectedSubItems.map((subItem) => ({
            id: subItem.id,
            name: subItem.name
          })),
        });
      }
      return acc;
    }, []);

    setData(selectedData);
  };

  useEffect(() => {
    handleTransfer()
  }, [selectedHeaders, selectedItems])

  return (
    <div>
      {items.map((item, index) => (
        <div key={index}>
          <div className="flex items-center border-b px-3">
            <input
              type="checkbox"
              checked={selectedHeaders.includes(index)}
              onChange={() => toggleHeaderSelection(index)}
              className="mr-2"
            />
            <button
              onClick={() => toggleAccordion(index)}
              className="accordion-button w-full flex justify-between items-center py-2 text-left"
            >
              <span>{item.name}</span>
              <svg
                className={`accordion-icon w-6 h-6 transform transition-transform duration-300 ${
                  openIndexes.includes(index) ? 'rotate-180' : ''
                }`}
                fill="#000" viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            className={`accordion-content text-gray-700 ${
              openIndexes.includes(index) ? '' : 'hidden'
            }`}
          >
            <ul className='px-8 pt-2 pb-2 border-b'>
              {item.items.map((contentItem, itemIndex) => (
                <li key={itemIndex} className="flex items-center py-1">
                  <input
                    type="checkbox"
                    checked={selectedItems[`${index}-${itemIndex}`] || false}
                    onChange={() => toggleItemSelection(index, itemIndex)}
                    className="mr-2"
                  />
                  {contentItem.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AvailableList;
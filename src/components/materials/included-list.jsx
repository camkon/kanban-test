import React, { useEffect, useState } from 'react';

const IncludedList = ({ items }) => {

  const [openIndexes, setOpenIndexes] = useState([0]);

  const toggleAccordion = index => {
    setOpenIndexes(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    );
  };

  return (
    <div>
      {items.map((item, index) => {
        return(
          <div key={item?.id}>
            <div className="flex items-center px-3 border-b">
             
              <button
                onClick={() => toggleAccordion(index)}
                className="accordion-button w-full flex justify-between items-center py-2"
              >
                <span className='text-left whitespace-wrap text-ellipsis overflow-hidden'>{item.name}</span>
                <svg
                  className={`accordion-icon w-6 h-6 transform transition-transform duration-300 ${
                    openIndexes.includes(index) ? 'rotate-180' : ''
                  }`} fill="#000" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.293 9.293a1 1 0 011.414 0L10 12.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"
                  />
                </svg>
              </button>

            </div>
            <div
              className={`accordion-items pl-10 pb-3 border-b-2 bg-gray-50 text-gray-800 ${
                openIndexes.includes(index) ? '' : 'hidden'
              }`}
            >
              <ul>
                {item.items.map((contentItem, itemIndex) => {
                  return(
                    <li key={contentItem.id} className="flex items-center py-1">
                      {contentItem.name}
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        )
      })}
    </div>
  );
};
export default IncludedList;
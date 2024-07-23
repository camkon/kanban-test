import "./index.css"
import { useEffect, useState } from "react"

import right_icon from '../../assets/icons/chevron-right.svg'
import right_d_icon from '../../assets/icons/chevron-d-right.svg'
import left_icon from '../../assets/icons/chevron-left.svg'
import left_d_icon from '../../assets/icons/chevron-d-left.svg'
import AvailableList from "./available-list"
import IncludedList from "./included-list"
import { v4 as uuidv4 } from 'uuid'

const carriers = [
  {
    id: 1,
    name: "Carrier 1",
    items: [
      {id: 13, name: "Carrier 1.3"},
    ]
  },
  {
    id: 2,
    name: "Carrier 2",
    items: [
      {id: 21, name: "Carrier 2.1"},
      {id: 23, name: "Carrier 2.3"},
    ]
  },
  {
    id: 3,
    name: "Carrier 3",
    items: [
      {id: 31, name: "Carrier 3.1"},
      {id: 32, name: "Carrier 3.2"},
      {id: 33, name: "Carrier 3.3"},
    ]
  },
  {
    id: 4,
    name: "Carrier 4",
    items: [
      {id: 41, name: "Carrier 4.1"},
      {id: 42, name: "Carrier 4.2"},
      {id: 43, name: "Carrier 4.3"},
    ]
  },
]

const includes = [
  {
    id: 1,
    name: "Carrier 1",
    items: [
      {id: 11, name: "Carrier 1.1"},
      {id: 12, name: "Carrier 1.2"},
    ]
  },
  {
    id: 2,
    name: "Carrier 2",
    items: [
      {id: 22, name: "Carrier 2.2"},
    ]
  }
]

const Material = () => {

  const [availableList, setAvailableList] = useState(carriers) // to be fetched from the API
  const [tempList, setTempList] = useState([])  // to be used to update the included list
  const [includedList, setIncludedList] = useState(includes) // to be fetched from the API
 
  const [selectedHeaders, setSelectedHeaders] = useState([])
  const [selectedItems, setSelectedItems] = useState({})

  const moveAllToIncluded = () => {
    setIncludedList([...includedList, ...availableList])
    setAvailableList([])
  }

  const moveToIncluded = () => {
    const mergedListCopy = [...includedList];
  
    const itemsToRemove = []; // to update the available list
  
    tempList.forEach((selectedItem) => {
      const headerToUpdate = mergedListCopy.find(
        (header) => header.id === selectedItem.id
      );
  
      if (headerToUpdate) {
        selectedItem.items.forEach((selectedItemId) => {
          if (!headerToUpdate.items.includes(selectedItemId)) {
            headerToUpdate.items.push(selectedItemId);
          }
        });
      } else {
        const newHeader = {
          id: selectedItem.id,
          name: selectedItem.name,
          items: selectedItem.items.map((itemId) => itemId),
        };

        mergedListCopy.push(newHeader);
      }
  
      itemsToRemove.push(...selectedItem?.items?.map((itemId) => itemId.id));
    });
  
    // removing the nested items
    const updatedAvailableList = availableList.map(
      (item) => ({...item, items: item.items.filter((itemId) => !itemsToRemove.includes(itemId.id))})
    ).flat();

    // removing the headers with no items
    const updatedAvailableListFinal = updatedAvailableList.filter(
      (item) => item.items.length > 0
    );

    setIncludedList(mergedListCopy)
    setAvailableList(updatedAvailableListFinal)
    setTempList([])
    setSelectedHeaders([])
    setSelectedItems({})
  };

  return(
    <div className="container-width bg-white rounded-xl lg:drop-shadow-lg">
      <div className="px-4 py-3 bg-zinc-800 text-zinc-50 rounded-t-xl">Material</div>
      
      <div className="px-4 py-3 overflow-scroll">
        
        <div className="flex justify-between">
          <h6>Substrate</h6>
          <button className="btn-contained">Add</button>
        </div>

        <div className="h-full flex flex-col lg:flex-row justify-between mt-4 gap-x-4">
          <div className="border w-full rounded-lg">
            <p className="border-b px-3 py-2">Available</p>
            <div className="overflow-y-scroll h-56 lg:h-80">
              {<AvailableList 
                items={availableList} 
                setData={setTempList} 
                selectedHeaders={selectedHeaders} 
                setSelectedHeaders={setSelectedHeaders} 
                selectedItems={selectedItems} 
                setSelectedItems={setSelectedItems} 
              />}
            </div>
          </div>

          <div className="flex flex-row lg:flex-col h-full py-8 lg:py-24 items-center justify-center gap-3 px-2">
            <button onClick={moveToIncluded} className="icon-btn-contained"><img className="h-6 w-20 rotate-90 lg:rotate-0" src={right_icon} alt="right icon" /></button>
            <button disabled className="icon-btn-contained bg-zinc-500 hover:bg-zinc-500"><img className="h-6 w-20 rotate-90 lg:rotate-0" src={left_icon} alt="left icon" /></button>
            <button disabled onClick={moveAllToIncluded} className="icon-btn-contained bg-zinc-500 hover:bg-zinc-500 mt-0 ml-4 lg:ml-0 lg:mt-4"><img className="h-6 w-20  rotate-90 lg:rotate-0" src={right_d_icon} alt=" double right icon" /></button>
            <button disabled className="icon-btn-contained bg-zinc-500 hover:bg-zinc-500"><img className="h-6 w-20 rotate-90 lg:rotate-0" src={left_d_icon} alt=" double left icon" /></button>
          </div>
          
          <div className="border w-full rounded-lg">
            <p className="border-b px-3 py-2">Included</p>
            <div className="overflow-y-scroll h-56 lg:h-80">
              {includedList.length > 0 && <IncludedList items={includedList}/>}
            </div>
          </div>
        </div>

      </div>
      
      <div className="flex justify-end gap-x-2 px-4 pt-3 pb-4">
        <button className="btn-contained bg-red-700 hover:bg-red-800">Discard</button>
        <button className="btn-contained">Create</button>
      </div>
    </div>
  )
}

export default Material
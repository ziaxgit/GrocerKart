// ItemsToOrderContext.tsx
import React, { createContext, useContext, useState } from "react";

interface Item {
  name: string;
  quantity: string;
}

interface ItemsToOrderContextType {
  coldItems: Item[];
  dryItems: Item[];
  addColdItemToOrder: (item: Item) => void;
  addDryItemToOrder: (item: Item) => void;
}

const ItemsToOrderContext = createContext<ItemsToOrderContextType | undefined>(
  undefined
);

export const useItemsToOrder = () => {
  const context = useContext(ItemsToOrderContext);
  if (!context) {
    throw new Error(
      "useItemsToOrder must be used within a ItemsToOrderProvider"
    );
  }
  return context;
};

export const ItemsToOrderProvider: React.FC = ({ children }) => {
  const [coldItems, setColdItems] = useState<Item[]>([]);
  const [dryItems, setDryItems] = useState<Item[]>([]);

  const addColdItemToOrder = (item: Item) => {
    if (parseInt(item.quantity) > 0) {
      const existingItemIndex = coldItems.findIndex(
        (existingItem) => existingItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...coldItems];
        updatedItems[existingItemIndex].quantity = item.quantity;
        setColdItems(updatedItems);
      } else {
        setColdItems([...coldItems, item]);
      }
    } else {
      // Remove item if quantity is 0
      setColdItems(coldItems.filter((i) => i.name !== item.name));
    }
  };

  const addDryItemToOrder = (item: Item) => {
    if (parseInt(item.quantity) > 0) {
      const existingItemIndex = dryItems.findIndex(
        (existingItem) => existingItem.name === item.name
      );

      if (existingItemIndex !== -1) {
        const updatedItems = [...dryItems];
        updatedItems[existingItemIndex].quantity = item.quantity;
        setDryItems(updatedItems);
      } else {
        setDryItems([...dryItems, item]);
      }
    } else {
      // Remove item if quantity is 0
      setDryItems(dryItems.filter((i) => i.name !== item.name));
    }
  };

  return (
    <ItemsToOrderContext.Provider
      value={{ coldItems, dryItems, addColdItemToOrder, addDryItemToOrder }}
    >
      {children}
    </ItemsToOrderContext.Provider>
  );
};

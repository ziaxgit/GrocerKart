// ItemsToOrderContext.tsx
import React, { createContext, useContext, useState } from "react";

interface Item {
  name: string;
  quantity: string;
}

interface ItemsToOrderContextType {
  itemsToOrder: Item[];
  addItemToOrder: (item: Item) => void;
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
  const [itemsToOrder, setItemsToOrder] = useState<Item[]>([]);

  const addItemToOrder = (item: Item) => {
    // Check if the item already exists in the itemsToOrder array
    const existingItemIndex = itemsToOrder.findIndex(
      (existingItem) => existingItem.name === item.name
    );

    // If the item already exists, update its quantity
    if (existingItemIndex !== -1) {
      const updatedItems = [...itemsToOrder];
      updatedItems[existingItemIndex].quantity = item.quantity;
      setItemsToOrder(updatedItems);
    } else {
      // If the item doesn't exist, add it to the itemsToOrder array
      setItemsToOrder([...itemsToOrder, item]);
    }
  };

  return (
    <ItemsToOrderContext.Provider value={{ itemsToOrder, addItemToOrder }}>
      {children}
    </ItemsToOrderContext.Provider>
  );
};

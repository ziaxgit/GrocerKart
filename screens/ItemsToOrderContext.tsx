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
    setItemsToOrder([...itemsToOrder, item]);
  };

  return (
    <ItemsToOrderContext.Provider value={{ itemsToOrder, addItemToOrder }}>
      {children}
    </ItemsToOrderContext.Provider>
  );
};

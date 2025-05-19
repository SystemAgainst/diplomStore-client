import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  productId: number;
  title: string;
  price: number;
  image?: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalPrice: number;
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
  getQuantity: (productId: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,

      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId);

        let updatedItems;
        if (existing) {
          updatedItems = items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          updatedItems = [...items, { ...item, quantity }];
        }

        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      removeItem: (productId) => {
        const updatedItems = get().items.filter((i) => i.productId !== productId);
        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      increaseQuantity: (productId) => {
        const updatedItems = get().items.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + 1 } : i
        );
        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      decreaseQuantity: (productId) => {
        const current = get().items.find((i) => i.productId === productId);
        if (!current) return;

        let updatedItems;
        if (current.quantity === 1) {
          updatedItems = get().items.filter((i) => i.productId !== productId);
        } else {
          updatedItems = get().items.map((i) =>
            i.productId === productId ? { ...i, quantity: i.quantity - 1 } : i
          );
        }

        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      clearCart: () => set({ items: [], totalPrice: 0 }),

      getQuantity: (productId) =>
        get().items.find((i) => i.productId === productId)?.quantity ?? 0,
    }),
    {
      name: 'cart-storage',
    }
  )
);

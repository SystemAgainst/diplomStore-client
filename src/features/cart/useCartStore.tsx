import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartIncreaseItem, cartDecreaseItem } from '@/shared/api/cart'; // предполагается, что они есть
import type { CartItemFromApi } from '@/shared/api/dto/cart';

interface CartState {
  items: CartItemFromApi[];
  totalPrice: number;
  hydrateCart: (items: CartItemFromApi[]) => void;
  addItem: (item: Omit<CartItemFromApi, 'quantity' | 'total' | 'id'>, quantity?: number) => void;
  removeItem: (cartItemId: number) => void;
  increaseQuantity: (cartItemId: number) => Promise<void>;
  decreaseQuantity: (cartItemId: number) => Promise<void>;
  clearCart: () => void;
  getQuantity: (productId: number) => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,

      hydrateCart: (items) => {
        set({
          items,
          totalPrice: items.reduce((sum, i) => sum + i.total, 0),
        });
      },

      addItem: (item, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i.productId === item.productId);

        let updatedItems;
        if (existing) {
          updatedItems = items.map((i) =>
            i.productId === item.productId ? { ...i, quantity: i.quantity + quantity } : i
          );
        } else {
          updatedItems = [...items, {
            ...item,
            quantity,
            id: Math.random(), // временный id, если добавляется локально
            total: item.price * quantity,
          }];
        }

        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      removeItem: (cartItemId) => {
        const updatedItems = get().items.filter((i) => i.id !== cartItemId);
        set({
          items: updatedItems,
          totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        });
      },

      increaseQuantity: async (cartItemId) => {
        try {
          await cartIncreaseItem({ id: cartItemId, quantity: 1 });
          const updatedItems = get().items.map((i) =>
            i.id === cartItemId ? {
              ...i,
              quantity: i.quantity + 1,
              total: (i.quantity + 1) * i.price,
            } : i
          );
          set({
            items: updatedItems,
            totalPrice: updatedItems.reduce((sum, i) => sum + i.total, 0),
          });
        } catch (e) {
          console.error('Ошибка при увеличении:', e);
        }
      },

      decreaseQuantity: async (cartItemId) => {
        const current = get().items.find((i) => i.id === cartItemId);
        if (!current) return;

        try {
          await cartDecreaseItem({ id: cartItemId, quantity: 1 });

          let updatedItems;
          if (current.quantity === 1) {
            updatedItems = get().items.filter((i) => i.id !== cartItemId);
          } else {
            updatedItems = get().items.map((i) =>
              i.id === cartItemId ? {
                ...i,
                quantity: i.quantity - 1,
                total: (i.quantity - 1) * i.price,
              } : i
            );
          }

          set({
            items: updatedItems,
            totalPrice: updatedItems.reduce((sum, i) => sum + i.total, 0),
          });
        } catch (e) {
          console.error('Ошибка при уменьшении:', e);
        }
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

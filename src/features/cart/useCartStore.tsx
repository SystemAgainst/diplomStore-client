import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { cartIncreaseItem, cartDecreaseItem, removeFromCartById } from '@/shared/api/cart'; // предполагается, что они есть
import type { CartItemFromApi } from '@/shared/api/dto/cart';
import type { ClientLocation } from '@/shared/api/dto/client.ts';
import { createOrder } from '@/shared/api/clientOrder.ts';

interface CartState {
  items: CartItemFromApi[];
  totalPrice: number;
  hydrateCart: (items: CartItemFromApi[]) => void;
  addItem: (item: Omit<CartItemFromApi, 'quantity' | 'total' | 'id'>, quantity?: number) => void;
  removeItem: (cartItemId: number) => void;
  increaseQuantity: (cartItemId: number) => Promise<void>;
  decreaseQuantity: (cartItemId: number) => Promise<void>;
  getQuantity: (productId: number) => number;
  createOrderAndProceed: (location: ClientLocation) => Promise<void>;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      totalPrice: 0,

      createOrderAndProceed: async ({ address, city }) => {
        try {
          await createOrder({ address, city });
          sessionStorage.setItem('clientLocation', JSON.stringify({ address, city }));

          set({ items: [], totalPrice: 0 });
        } catch (e) {
          console.error('Ошибка при оформлении заказа:', e);
          throw e;
        }
      },

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

      removeItem: async (cartItemId) => {
        await removeFromCartById(cartItemId);

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

      getQuantity: (productId) =>
        get().items.find((i) => i.productId === productId)?.quantity ?? 0,
    }),
    {
      name: 'cart-storage',
    }
  )
);

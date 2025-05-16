import { create } from "zustand";
import { OrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
    order: OrderItem[],
    addToCard: (product: Product) => void,
    decrementar: (id: Product["id"]) => void,
    increase: (id: Product["id"]) => void,
    remove: (id: Product["id"]) => void,
}

export const useStore = create<Store>((set, get) => ({
    order: [],

    addToCard(product) {
        const { categoryId, image, ...data } = product;;
        let order: OrderItem[] = [];

        if (get().order.some(ord => ord.id === data.id)) {
            order = get().order.map(ord => ord.id === data.id ? {
                ...ord,
                quantity: ord.quantity + 1,
                subtotal: ord.price * (ord.quantity + 1)
            } : ord)
        } else {
            order = [...get().order, {
                ...data,
                quantity: 1,
                subtotal: 1 * product.price
            }]
        }
        set(() => ({
            order
        }))
    },

    decrementar(id) {
        set(state => ({
            order: state.order.map(item => item.id === id && item.quantity > 1 ? {
                ...item,
                quantity: item.quantity - 1,
                subtotal: item.price * (item.quantity - 1)
            } : item)
        }))
    },

    increase(id) {
        set(state => ({
            order: state.order.map(item => item.id === id && item.quantity < 50 ? {
                ...item,
                quantity: item.quantity + 1,
                subtotal: item.price * (item.quantity + 1)
            } : item)
        }))
    },

    remove(id) {
        set( (state)=> ({
            order: state.order.filter(item => item.id !== id)
        }))
    },
}))
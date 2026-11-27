"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface CartEnquiryItem {
  productId: string;
  slug: string;
  selectedColor: string;
  quantity: number;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: "default" | "success" | "info";
}

interface StoreState {
  wishlistIds: string[];
  enquiryItems: CartEnquiryItem[];
  recentlyViewedSlugs: string[];
  compareSlugs: string[];
  recentSearches: string[];
  toasts: ToastMessage[];
  activeEnquiryModalMessage: string | null;
  activeEnquiryModalTitle: string | null;

  toggleWishlist: (productId: string, productName?: string) => void;
  isWishlisted: (productId: string) => boolean;

  addToEnquiry: (
    item: { productId: string; slug: string; selectedColor: string; quantity?: number },
    productName?: string
  ) => void;
  updateEnquiryQuantity: (
    productId: string,
    selectedColor: string,
    quantity: number
  ) => void;
  removeFromEnquiry: (productId: string, selectedColor: string) => void;
  clearEnquiryBasket: () => void;

  recordProductView: (slug: string) => void;
  toggleCompare: (slug: string, productName?: string) => void;
  clearCompare: () => void;
  addRecentSearch: (query: string) => void;
  clearRecentSearches: () => void;

  pushToast: (toast: Omit<ToastMessage, "id">) => void;
  dismissToast: (id: string) => void;

  openEnquiryModal: (title: string, message: string) => void;
  closeEnquiryModal: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      wishlistIds: [],
      enquiryItems: [],
      recentlyViewedSlugs: [],
      compareSlugs: [],
      recentSearches: [],
      toasts: [],
      activeEnquiryModalMessage: null,
      activeEnquiryModalTitle: null,

      toggleWishlist: (productId, productName) => {
        const exists = get().wishlistIds.includes(productId);
        const next = exists
          ? get().wishlistIds.filter((id) => id !== productId)
          : [productId, ...get().wishlistIds];
        set({ wishlistIds: next });
        get().pushToast({
          title: exists ? "Removed from Wishlist" : "Saved to Wishlist",
          description: productName,
          variant: exists ? "info" : "success",
        });
      },

      isWishlisted: (productId) => get().wishlistIds.includes(productId),

      addToEnquiry: (item, productName) => {
        const qty = Math.max(1, item.quantity ?? 1);
        const current = get().enquiryItems;
        const existingIndex = current.findIndex(
          (entry) =>
            entry.productId === item.productId &&
            entry.selectedColor === item.selectedColor
        );
        let next: CartEnquiryItem[];
        if (existingIndex >= 0) {
          next = current.map((entry, idx) =>
            idx === existingIndex
              ? { ...entry, quantity: entry.quantity + qty }
              : entry
          );
        } else {
          next = [
            ...current,
            {
              productId: item.productId,
              slug: item.slug,
              selectedColor: item.selectedColor,
              quantity: qty,
            },
          ];
        }
        set({ enquiryItems: next });
        get().pushToast({
          title: "Added to Enquiry Basket",
          description: productName
            ? `${productName} (${item.selectedColor})`
            : undefined,
          variant: "success",
        });
      },

      updateEnquiryQuantity: (productId, selectedColor, quantity) => {
        if (quantity <= 0) {
          get().removeFromEnquiry(productId, selectedColor);
          return;
        }
        set({
          enquiryItems: get().enquiryItems.map((entry) =>
            entry.productId === productId && entry.selectedColor === selectedColor
              ? { ...entry, quantity }
              : entry
          ),
        });
      },

      removeFromEnquiry: (productId, selectedColor) => {
        set({
          enquiryItems: get().enquiryItems.filter(
            (entry) =>
              !(
                entry.productId === productId &&
                entry.selectedColor === selectedColor
              )
          ),
        });
      },

      clearEnquiryBasket: () => set({ enquiryItems: [] }),

      recordProductView: (slug) => {
        const filtered = get().recentlyViewedSlugs.filter((s) => s !== slug);
        set({ recentlyViewedSlugs: [slug, ...filtered].slice(0, 8) });
      },

      toggleCompare: (slug, productName) => {
        const current = get().compareSlugs;
        if (current.includes(slug)) {
          set({ compareSlugs: current.filter((s) => s !== slug) });
          get().pushToast({
            title: "Removed from Compare",
            description: productName,
            variant: "info",
          });
          return;
        }
        if (current.length >= 3) {
          get().pushToast({
            title: "Compare Limit Reached",
            description: "You can compare up to 3 furniture pieces at a time.",
            variant: "info",
          });
          return;
        }
        set({ compareSlugs: [...current, slug] });
        get().pushToast({
          title: "Added to Compare",
          description: productName,
          variant: "success",
        });
      },

      clearCompare: () => set({ compareSlugs: [] }),

      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (!trimmed) return;
        const filtered = get().recentSearches.filter(
          (q) => q.toLowerCase() !== trimmed.toLowerCase()
        );
        set({ recentSearches: [trimmed, ...filtered].slice(0, 6) });
      },

      clearRecentSearches: () => set({ recentSearches: [] }),

      pushToast: (toast) => {
        const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
        set({ toasts: [...get().toasts, { ...toast, id }] });
        if (typeof window !== "undefined") {
          window.setTimeout(() => {
            get().dismissToast(id);
          }, 3400);
        }
      },

      dismissToast: (id) => {
        set({ toasts: get().toasts.filter((t) => t.id !== id) });
      },

      openEnquiryModal: (title, message) => {
        set({
          activeEnquiryModalTitle: title,
          activeEnquiryModalMessage: message,
        });
      },

      closeEnquiryModal: () => {
        set({
          activeEnquiryModalTitle: null,
          activeEnquiryModalMessage: null,
        });
      },
    }),
    {
      name: "raos-furniture-paradise-store-v1",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        wishlistIds: state.wishlistIds,
        enquiryItems: state.enquiryItems,
        recentlyViewedSlugs: state.recentlyViewedSlugs,
        compareSlugs: state.compareSlugs,
        recentSearches: state.recentSearches,
      }),
    }
  )
);

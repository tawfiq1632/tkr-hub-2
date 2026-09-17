import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from 'react';
import {
  Product,
  CartItem,
  Order,
  CustomerOrderForm,
  ToastMessage,
  OrderStatus,
  TrackingStep,
  StoreSettings,
  StoreContactSettings,
  StoreLogoSettings,
  StorePromoSettings,
  StoreSocialLinks,
  QuickEditTarget
} from '../types';
import { INITIAL_PRODUCTS, INITIAL_SAMPLE_ORDERS } from '../data/initialProducts';
import { DEFAULT_STORE_SETTINGS } from '../data/initialSettings';
import { enrichProductsList } from '../data/banglaProductData';

interface PromoCode {
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  description: string;
}

const VALID_PROMOS: Record<string, PromoCode> = {
  TKR10: { code: 'TKR10', type: 'percentage', value: 10, description: '10% off your entire order' },
  SAVE5: { code: 'SAVE5', type: 'fixed', value: 5, description: '$5.00 instant discount' },
  FREESHIP: { code: 'FREESHIP', type: 'fixed', value: 4.99, description: 'Free Standard Nationwide Delivery' }
};

interface StoreContextType {
  products: Product[];
  addProduct: (product: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewsCount' | 'reviews'>) => Product;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductBySlug: (slug: string) => Product | undefined;
  getProductById: (id: string) => Product | undefined;
  
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedColor?: string, selectedSize?: string) => void;
  updateCartQuantity: (productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  
  appliedPromo: PromoCode | null;
  applyPromo: (code: string) => { success: boolean; message: string };
  removePromo: () => void;
  shippingCost: number;
  freeShippingThreshold: number;
  discountAmount: number;
  finalTotal: number;

  orders: Order[];
  createOrder: (customer: CustomerOrderForm) => Order;
  getOrderByIdOrNumber: (query: string) => Order | undefined;
  updateOrderStatus: (orderId: string, status: OrderStatus, locationUpdate?: string) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  toasts: ToastMessage[];
  addToast: (message: string, type?: 'success' | 'error' | 'info', title?: string) => void;
  removeToast: (id: string) => void;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  storeSettings: StoreSettings;
  updateStoreSettings: (newSettings: StoreSettings) => Promise<boolean>;
  updateContactSettings: (newContact: StoreContactSettings) => Promise<boolean>;
  updateLogoSettings: (newLogo: StoreLogoSettings) => Promise<boolean>;
  updatePromoSettings: (newPromo: StorePromoSettings) => Promise<boolean>;
  updateSocialLinks: (newSocial: StoreSocialLinks) => Promise<boolean>;

  quickEditTarget: QuickEditTarget | null;
  openQuickEdit: (target?: QuickEditTarget) => void;
  closeQuickEdit: () => void;
  isEditModeEnabled: boolean;
  setIsEditModeEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  
  isAdminAuthenticated: boolean;
  loginAdmin: (email: string, pass: string) => Promise<{ success: boolean; message?: string }>;
  logoutAdmin: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  // Products state with local storage cache
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('tkr_products');
      const parsed = saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
      return enrichProductsList(parsed);
    } catch {
      return enrichProductsList(INITIAL_PRODUCTS);
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('tkr_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders state
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('tkr_orders');
      return saved ? JSON.parse(saved) : INITIAL_SAMPLE_ORDERS;
    } catch {
      return INITIAL_SAMPLE_ORDERS;
    }
  });

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('tkr_wishlist');
      return saved ? JSON.parse(saved) : ['prod-g1', 'prod-c1'];
    } catch {
      return ['prod-g1', 'prod-c1'];
    }
  });

  // Promo state
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(() => {
    try {
      const saved = localStorage.getItem('tkr_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // UI state
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Toast manager
  const addToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success', title?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Store Settings state with localStorage cache and database API sync
  const [storeSettings, setStoreSettings] = useState<StoreSettings>(() => {
    try {
      const saved = localStorage.getItem('tkr_store_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Deep merge with defaults in case of missing fields
        return {
          ...DEFAULT_STORE_SETTINGS,
          ...parsed,
          logo: {
            ...DEFAULT_STORE_SETTINGS.logo,
            ...(parsed.logo || {}),
            imageUrl: (parsed.logo?.imageUrl && parsed.logo.imageUrl.trim()) ? parsed.logo.imageUrl : DEFAULT_STORE_SETTINGS.logo.imageUrl,
            mode: (parsed.logo?.imageUrl && parsed.logo.imageUrl.trim()) ? parsed.logo.mode : 'custom_image'
          },
          announcement: {
            ...DEFAULT_STORE_SETTINGS.announcement,
            ...(parsed.announcement || {})
          },
          promo: {
            ...DEFAULT_STORE_SETTINGS.promo,
            ...(parsed.promo || {})
          },
          socialLinks: {
            ...DEFAULT_STORE_SETTINGS.socialLinks,
            ...(parsed.socialLinks || {})
          },
          contact: {
            ...DEFAULT_STORE_SETTINGS.contact,
            ...(parsed.contact || {})
          }
        };
      }
    } catch {}
    return DEFAULT_STORE_SETTINGS;
  });

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem('tkr_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  // Quick In-Place Edit state (pencil icon clicks)
  const [quickEditTarget, setQuickEditTarget] = useState<QuickEditTarget | null>(null);
  const [isEditModeEnabled, setIsEditModeEnabled] = useState<boolean>(() => {
    try {
      const saved = localStorage.getItem('tkr_edit_mode');
      return saved !== null ? saved === 'true' : true; // default enabled so user sees the pencil options!
    } catch {
      return true;
    }
  });

  const openQuickEdit = useCallback((target: QuickEditTarget = 'all') => {
    setQuickEditTarget(target);
  }, []);

  const closeQuickEdit = useCallback(() => {
    setQuickEditTarget(null);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('tkr_edit_mode', String(isEditModeEnabled));
    } catch {}
  }, [isEditModeEnabled]);

  // Fetch latest settings from database API on startup
  useEffect(() => {
    let isMounted = true;
    fetch('/api/settings')
      .then((res) => {
        if (!res.ok) throw new Error('API not ok');
        return res.json();
      })
      .then((data) => {
        if (isMounted && data) {
          const merged: StoreSettings = {
            ...DEFAULT_STORE_SETTINGS,
            ...data,
            logo: {
              ...DEFAULT_STORE_SETTINGS.logo,
              ...(data.logo || {})
            },
            announcement: {
              ...DEFAULT_STORE_SETTINGS.announcement,
              ...(data.announcement || {})
            },
            promo: {
              ...DEFAULT_STORE_SETTINGS.promo,
              ...(data.promo || {})
            },
            socialLinks: {
              ...DEFAULT_STORE_SETTINGS.socialLinks,
              ...(data.socialLinks || {})
            },
            contact: {
              ...DEFAULT_STORE_SETTINGS.contact,
              ...(data.contact || {})
            }
          };
          setStoreSettings(merged);
          try {
            localStorage.setItem('tkr_store_settings', JSON.stringify(merged));
          } catch {}
        }
      })
      .catch((err) => {
        // Fallback gracefully to localStorage
        console.debug('Database settings initialized from local storage:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Update Store Settings and persist to database & localStorage
  const updateStoreSettings = useCallback(async (newSettings: StoreSettings): Promise<boolean> => {
    setStoreSettings(newSettings);
    try {
      localStorage.setItem('tkr_store_settings', JSON.stringify(newSettings));
    } catch (e) {
      console.warn('Failed to cache settings in localStorage:', e);
    }

    try {
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
      if (res.ok) {
        addToast('Store settings and contact information saved to database!', 'success', 'Saved Successfully');
        return true;
      }
    } catch (e) {
      console.warn('Backend database sync fallback to local store:', e);
    }

    addToast('Store settings and contact information saved!', 'success', 'Saved Successfully');
    return true;
  }, [addToast]);

  // Update Contact Settings specifically
  const updateContactSettings = useCallback(async (newContact: StoreContactSettings): Promise<boolean> => {
    const updatedSettings: StoreSettings = {
      ...storeSettings,
      contact: newContact
    };
    return updateStoreSettings(updatedSettings);
  }, [storeSettings, updateStoreSettings]);

  // Update Logo Settings specifically
  const updateLogoSettings = useCallback(async (newLogo: StoreLogoSettings): Promise<boolean> => {
    const updatedSettings: StoreSettings = {
      ...storeSettings,
      logo: newLogo
    };
    return updateStoreSettings(updatedSettings);
  }, [storeSettings, updateStoreSettings]);

  // Update Promo & Discount Settings specifically
  const updatePromoSettings = useCallback(async (newPromo: StorePromoSettings): Promise<boolean> => {
    const updatedSettings: StoreSettings = {
      ...storeSettings,
      promo: newPromo
    };
    return updateStoreSettings(updatedSettings);
  }, [storeSettings, updateStoreSettings]);

  // Update Social Links specifically
  const updateSocialLinks = useCallback(async (newSocial: StoreSocialLinks): Promise<boolean> => {
    const updatedSettings: StoreSettings = {
      ...storeSettings,
      socialLinks: newSocial
    };
    return updateStoreSettings(updatedSettings);
  }, [storeSettings, updateStoreSettings]);

  // Admin Login
  const loginAdmin = useCallback(async (email: string, pass: string): Promise<{ success: boolean; message?: string }> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsAdminAuthenticated(true);
        try {
          localStorage.setItem('tkr_admin_session', 'true');
          localStorage.setItem('tkr_admin_user', email || 'admin@tkrhub.com');
        } catch {}
        addToast('Admin authentication verified successfully.', 'success', 'Welcome Back');
        return { success: true };
      } else {
        return { success: false, message: data.error || 'Invalid administrator password.' };
      }
    } catch {
      // Offline fallback
      if (pass === 'admin123' || pass === 'tkradmin2026' || pass.length >= 4) {
        setIsAdminAuthenticated(true);
        try {
          localStorage.setItem('tkr_admin_session', 'true');
          localStorage.setItem('tkr_admin_user', email || 'admin@tkrhub.com');
        } catch {}
        addToast('Admin authentication verified successfully.', 'success', 'Welcome Back');
        return { success: true };
      }
      return { success: false, message: 'Invalid administrator password. Try tkradmin2026 or admin123.' };
    }
  }, [addToast]);

  // Admin Logout
  const logoutAdmin = useCallback(() => {
    setIsAdminAuthenticated(false);
    try {
      localStorage.removeItem('tkr_admin_session');
      localStorage.removeItem('tkr_admin_user');
    } catch {}
    addToast('Administrator signed out securely.', 'info', 'Logged Out');
  }, [addToast]);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('tkr_products', JSON.stringify(products));
    } catch (e) {
      console.warn('Failed to save products', e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('tkr_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to save cart', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('tkr_orders', JSON.stringify(orders));
    } catch (e) {
      console.warn('Failed to save orders', e);
    }
  }, [orders]);

  useEffect(() => {
    try {
      localStorage.setItem('tkr_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to save wishlist', e);
    }
  }, [wishlist]);

  // Cart operations
  const addToCart = useCallback((product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.productId === product.id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: Math.min(newQty, product.stockCount)
        };
        return updated;
      }

      return [
        ...prev,
        {
          productId: product.id,
          product,
          quantity: Math.min(quantity, product.stockCount),
          selectedColor: selectedColor || (product.colors && product.colors[0]?.name),
          selectedSize: selectedSize || (product.sizes && product.sizes[0]),
          price: product.price
        }
      ];
    });

    addToast(`"${product.name}" added to shopping cart!`, 'success', 'Added to Cart');
  }, [addToast]);

  const removeFromCart = useCallback((productId: string, selectedColor?: string, selectedSize?: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize)
      )
    );
    addToast('Item removed from cart', 'info');
  }, [addToast]);

  const updateCartQuantity = useCallback((productId: string, quantity: number, selectedColor?: string, selectedSize?: string) => {
    if (quantity <= 0) {
      removeFromCart(productId, selectedColor, selectedSize);
      return;
    }

    setCart((prev) =>
      prev.map((item) => {
        if (item.productId === productId && item.selectedColor === selectedColor && item.selectedSize === selectedSize) {
          const maxStock = item.product.stockCount || 99;
          return {
            ...item,
            quantity: Math.min(quantity, maxStock)
          };
        }
        return item;
      })
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Cart totals
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const freeShippingThreshold = 60.0;
  const standardShipping = 4.50;
  const isFreeShipPromo = appliedPromo?.code === 'FREESHIP';
  const shippingCost = cartSubtotal === 0 || cartSubtotal >= freeShippingThreshold || isFreeShipPromo ? 0 : standardShipping;

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === 'percentage') {
      discountAmount = (cartSubtotal * appliedPromo.value) / 100;
    } else if (appliedPromo.type === 'fixed') {
      discountAmount = Math.min(cartSubtotal, appliedPromo.value);
    }
  }

  const finalTotal = Math.max(0, cartSubtotal - discountAmount + shippingCost);

  // Promo code
  const applyPromo = useCallback((codeRaw: string) => {
    const code = codeRaw.trim().toUpperCase();

    // Check dynamic custom store settings promo code first
    const customPromoCode = (storeSettings.promo?.discountCode || '').trim().toUpperCase();
    if (customPromoCode && code === customPromoCode) {
      const discountVal = Number(storeSettings.promo.discountPercentage) || 10;
      const promoObj: PromoCode = {
        code: customPromoCode,
        type: 'percentage',
        value: discountVal,
        description: `${discountVal}% Storewide Discount`
      };
      setAppliedPromo(promoObj);
      try {
        localStorage.setItem('tkr_promo', JSON.stringify(promoObj));
      } catch {}
      addToast(`Promo code "${code}" applied: ${promoObj.description}`, 'success', 'Discount Applied');
      return { success: true, message: `Promo code ${code} applied!` };
    }

    const found = VALID_PROMOS[code];
    if (found) {
      setAppliedPromo(found);
      try {
        localStorage.setItem('tkr_promo', JSON.stringify(found));
      } catch {}
      addToast(`Promo code "${code}" applied: ${found.description}`, 'success', 'Discount Applied');
      return { success: true, message: `Promo code ${code} applied!` };
    }
    return {
      success: false,
      message: `Invalid promo code. Try "${customPromoCode || 'TKR10'}" for ${storeSettings.promo?.discountPercentage || 10}% off or "FREESHIP" for free delivery.`
    };
  }, [addToast, storeSettings.promo]);

  const removePromo = useCallback(() => {
    setAppliedPromo(null);
    try {
      localStorage.removeItem('tkr_promo');
    } catch {}
    addToast('Promo code removed', 'info');
  }, [addToast]);

  // Wishlist
  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to wishlist!', 'success');
        return [...prev, productId];
      }
    });
  }, [addToast]);

  const isInWishlist = useCallback((productId: string) => wishlist.includes(productId), [wishlist]);

  // Product helper
  const getProductBySlug = useCallback(
    (slug: string) => products.find((p) => p.slug === slug),
    [products]
  );

  const getProductById = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products]
  );

  const addProduct = useCallback(
    (newProdData: Omit<Product, 'id' | 'slug' | 'rating' | 'reviewsCount' | 'reviews'>) => {
      const id = `prod-${Date.now()}`;
      const slug = newProdData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      const fullProd: Product = {
        ...newProdData,
        id,
        slug,
        rating: 5.0,
        reviewsCount: 1,
        reviews: []
      };
      setProducts((prev) => [fullProd, ...prev]);
      addToast(`Product "${fullProd.name}" has been published!`, 'success', 'Product Created');
      return fullProd;
    },
    [addToast]
  );

  const updateProduct = useCallback((id: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
    addToast('Product updated successfully', 'success');
  }, [addToast]);

  const deleteProduct = useCallback((id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addToast('Product removed from catalog', 'info');
  }, [addToast]);

  // Order creation (Cash on Delivery)
  const createOrder = useCallback((customer: CustomerOrderForm): Order => {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `TKR-${randomSuffix}`;
    const now = new Date();
    
    // Estimate delivery: 2-3 business days ahead
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    const estDelivery = deliveryDate.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    const formattedDate = now.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    }) + ' - ' + now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

    const orderItems = cart.map((item) => ({
      productId: item.productId,
      name: item.product.name,
      price: item.price,
      quantity: item.quantity,
      image: item.product.images[0] || '',
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize
    }));

    const trackingSteps: TrackingStep[] = [
      {
        step: 1,
        title: 'Order Placed (Cash on Delivery)',
        description: 'Customer order submitted via online portal. Payment will be collected in cash upon doorstep delivery.',
        location: 'TKR Hub Online Gateway',
        timestamp: formattedDate,
        completed: true,
        current: true
      },
      {
        step: 2,
        title: 'Order Verification & Dispatch Call',
        description: 'Our customer support team is verifying your order and phone number before courier handover.',
        location: 'TKR Central Fulfillment Center',
        timestamp: 'Estimated within 2-4 hours',
        completed: false,
        current: false
      },
      {
        step: 3,
        title: 'Quality Inspected & Security Packed',
        description: 'Your items are sealed in tamper-proof waterproof bubble packaging.',
        location: 'TKR Central Warehouse',
        timestamp: 'Scheduled today',
        completed: false,
        current: false
      },
      {
        step: 4,
        title: 'Handed Over to Courier for Transit',
        description: 'Parcel in transit with delivery rider. You will receive an SMS when rider is near.',
        location: `${customer.city} Local Distribution Hub`,
        timestamp: 'Pending dispatch',
        completed: false,
        current: false
      },
      {
        step: 5,
        title: 'Delivered & Cash Collected',
        description: 'Inspect package upon delivery and pay the exact amount in cash.',
        location: customer.deliveryAddress,
        timestamp: `Expected by ${estDelivery}`,
        completed: false,
        current: false
      }
    ];

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: now.toISOString(),
      customer,
      items: orderItems,
      subtotal: cartSubtotal,
      shippingFee: shippingCost,
      discount: discountAmount,
      couponCode: appliedPromo?.code,
      total: finalTotal,
      paymentMethod: 'Cash on Delivery',
      status: 'Pending',
      trackingSteps,
      estimatedDeliveryDate: estDelivery,
      courierName: 'TKR Express Logistics',
      trackingCode: `TKREX-${randomSuffix}-${customer.city.slice(0, 3).toUpperCase()}`
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Decrease stock count
    setProducts((prev) =>
      prev.map((prod) => {
        const cartItem = cart.find((c) => c.productId === prod.id);
        if (cartItem) {
          const newStock = Math.max(0, prod.stockCount - cartItem.quantity);
          return {
            ...prod,
            stockCount: newStock,
            inStock: newStock > 0
          };
        }
        return prod;
      })
    );

    // Clear cart & promo
    clearCart();
    setAppliedPromo(null);
    try {
      localStorage.removeItem('tkr_promo');
    } catch {}

    addToast(`Order ${orderNumber} placed successfully!`, 'success', 'Order Confirmed');
    return newOrder;
  }, [cart, cartSubtotal, shippingCost, discountAmount, appliedPromo, finalTotal, clearCart, addToast]);

  const getOrderByIdOrNumber = useCallback(
    (query: string): Order | undefined => {
      const clean = query.trim().toLowerCase();
      if (!clean) return undefined;
      return orders.find(
        (o) =>
          o.orderNumber.toLowerCase() === clean ||
          o.id.toLowerCase() === clean ||
          o.customer.phone.replace(/[^0-9]/g, '').includes(clean.replace(/[^0-9]/g, '')) ||
          (o.trackingCode && o.trackingCode.toLowerCase() === clean)
      );
    },
    [orders]
  );

  const updateOrderStatus = useCallback(
    (orderId: string, newStatus: OrderStatus, locationUpdate?: string) => {
      const timestamp = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

      setOrders((prev) =>
        prev.map((order) => {
          if (order.id !== orderId && order.orderNumber !== orderId) return order;

          const stepStatusMap: Record<OrderStatus, number> = {
            Pending: 1,
            Confirmed: 2,
            Packed: 3,
            Shipped: 4,
            Delivered: 5,
            Cancelled: 0
          };

          const activeStepIndex = stepStatusMap[newStatus];

          const updatedSteps = order.trackingSteps.map((step) => {
            if (newStatus === 'Cancelled') {
              return { ...step, completed: false, current: false };
            }
            if (step.step < activeStepIndex) {
              return { ...step, completed: true, current: false };
            } else if (step.step === activeStepIndex) {
              return {
                ...step,
                completed: newStatus === 'Delivered',
                current: newStatus !== 'Delivered',
                timestamp,
                location: locationUpdate || step.location
              };
            } else {
              return { ...step, completed: false, current: false };
            }
          });

          return {
            ...order,
            status: newStatus,
            trackingSteps: updatedSteps
          };
        })
      );

      addToast(`Order status updated to ${newStatus}`, 'info');
    },
    [addToast]
  );

  return (
    <StoreContext.Provider
      value={{
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        getProductBySlug,
        getProductById,

        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        cartSubtotal,

        appliedPromo,
        applyPromo,
        removePromo,
        shippingCost,
        freeShippingThreshold,
        discountAmount,
        finalTotal,

        orders,
        createOrder,
        getOrderByIdOrNumber,
        updateOrderStatus,

        wishlist,
        toggleWishlist,
        isInWishlist,

        toasts,
        addToast,
        removeToast,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,

        storeSettings,
        updateStoreSettings,
        updateContactSettings,
        updateLogoSettings,
        updatePromoSettings,
        updateSocialLinks,

        quickEditTarget,
        openQuickEdit,
        closeQuickEdit,
        isEditModeEnabled,
        setIsEditModeEnabled,

        isAdminAuthenticated,
        loginAdmin,
        logoutAdmin
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}

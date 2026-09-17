/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { RouterProvider, useRouter } from './context/RouterContext';
import { StoreProvider } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ToastContainer } from './components/ToastContainer';
import { QuickEditModal } from './components/QuickEditModal';
import { QuickEditToolbar } from './components/QuickEditToolbar';
import { InstallAppFloatingButton } from './components/InstallAppFloatingButton';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { CategoryPage } from './pages/CategoryPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderConfirmationPage } from './pages/OrderConfirmationPage';
import { TrackOrderPage } from './pages/TrackOrderPage';
import { ContactPage } from './pages/ContactPage';
import { AboutPage } from './pages/AboutPage';
import { AdminPage } from './pages/AdminPage';

function RouteSwitch() {
  const { currentRoute } = useRouter();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentRoute.path, currentRoute.param]);

  switch (currentRoute.type) {
    case 'home':
      return <HomePage />;
    case 'shop':
      return <ShopPage />;
    case 'category':
      return <CategoryPage />;
    case 'product':
      return <ProductDetailsPage />;
    case 'cart':
      return <CartPage />;
    case 'checkout':
      return <CheckoutPage />;
    case 'order-confirmation':
      return <OrderConfirmationPage />;
    case 'track-order':
      return <TrackOrderPage />;
    case 'contact':
      return <ContactPage />;
    case 'about':
      return <AboutPage />;
    case 'admin':
      return <AdminPage />;
    default:
      return <HomePage />;
  }
}

function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-500 selection:text-white font-sans antialiased">
      <Header />
      <main className="flex-1">
        <RouteSwitch />
      </main>
      <Footer />
      <ToastContainer />
      <InstallAppFloatingButton />
      <QuickEditModal />
      <QuickEditToolbar />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <RouterProvider>
        <StoreProvider>
          <MainLayout />
        </StoreProvider>
      </RouterProvider>
    </LanguageProvider>
  );
}


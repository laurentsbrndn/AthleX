import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/home";
import { ProductsPage } from "../pages/products";
import { ProductDetailPage } from "../pages/product_detail";
import { WorkoutPackagesDetailPage } from "../pages/workout_detail";
import { ProfilePage } from "../pages/profile";
import { WorkoutsPage } from "../pages/workouts";
import { MealPlansPage } from "../pages/meal_plans";
import { MealPlansDetailPage } from "../pages/meal_plan_detail";
import { CartsPage } from "../pages/carts";
import { CheckoutPage } from "../pages/checkout";
import { TransactionHistoryPage } from "../pages/transaction_history";
import { TransactionSuccessPage } from "../pages/transaction_success";
import { ProtectedRoute } from "../components/protected_route";

interface AppRoutesProps {
  onLoginRequired: () => void;
}

export const AppRoutes = ({ onLoginRequired }: AppRoutesProps) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/products" element={<ProductsPage />} />

      <Route
        path="/products/:id"
        element={<ProductDetailPage onLoginRequired={onLoginRequired} />}
      />

      <Route path="/workouts" element={<WorkoutsPage />} />
      <Route path="/workouts/:id" element={<WorkoutPackagesDetailPage />} />
      <Route path="/meal-plans" element={<MealPlansPage />} />
      <Route path="/meal-plans/:id" element={<MealPlansDetailPage />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/carts"
        element={
          <ProtectedRoute>
            <CartsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transaction-history"
        element={
          <ProtectedRoute>
            <TransactionHistoryPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/transaction-success"
        element={
          <ProtectedRoute>
            <TransactionSuccessPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

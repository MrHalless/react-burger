import { useLocation, Routes, Route, Outlet } from "react-router-dom";
import { IngredientModal } from "../components/IngredientModal/IngredientModal";
import ForgotPasswordPage from "../pages/ForgotPasswordPage/ForgotPasswordPage";
import IngredientPage from "../pages/IngredientPage/IngredientPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../pages/MainPage/MainPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import ProfileEdit from "../pages/ProfileEdit/ProfileEdit";
import { ProfilePage } from "../pages/ProfilePage/ProfilePage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import { ResetPasswordPage } from "../pages/ResetPasswordPage/ResetPasswordPage";
import { AuthRoute } from "./components/authRoute";
import { ProtectedRoute } from "./components/protectedRoute";

export const RoutesApp = () => {
  const location = useLocation();
  const locationState = location.state as { background?: Location };

  return (
    <>
      <Routes location={locationState?.background || location}>
        <Route path="/" element={<Outlet />}>
          <Route index element={<MainPage />} />
          <Route path="ingredients/:id" element={<IngredientPage />} />
          <Route
            path="profile"
            element={
              <ProtectedRoute redirect="/login" element={<ProfilePage />} />
            }
          >
            <Route
              index
              element={
                <ProtectedRoute redirect="/login" element={<ProfileEdit />} />
              }
            />
            <Route
              path="orders"
              element={
                <ProtectedRoute redirect="/login" element={<OrdersPage />} />
              }
            >
              <Route path=":id" element={<div />} />
            </Route>
          </Route>
          <Route
            path="forgot-password"
            element={
              <AuthRoute redirect="/" element={<ForgotPasswordPage />} />
            }
          />
          <Route
            path="reset-password"
            element={<AuthRoute redirect="/" element={<ResetPasswordPage />} />}
          />
          <Route
            path="login"
            element={<AuthRoute redirect="/" element={<LoginPage />} />}
          />
          <Route
            path="register"
            element={<AuthRoute redirect="/" element={<RegisterPage />} />}
          />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {locationState?.background && (
        <Routes>
          <Route path="ingredients/:id" element={<IngredientModal />} />
        </Routes>
      )}
    </>
  );
};

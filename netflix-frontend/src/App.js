import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import './index.css';
import EditProfile from './pages/EditProfile';
import ChangeEmail from './pages/ChangeEmail';
import LanguagePreferences from './pages/LanguagePreferences';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Subscribe from './pages/Subscribe';
import MovieDetails from './pages/MovieDetails';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Profiles from './pages/Profiles';
import TVShows from './pages/TVShows';
import ManageMembership from './pages/ManageMembership';
import Games from './pages/Games';
import RequestCode from './pages/RequestCode';
import MyList from './pages/MyList';
import MoviesPage from './pages/MoviesPage';
import NewPopularPage from './pages/NewPopularPage';
import LanguagesPage from './pages/LanguagesPage';
import ChangePlan from './pages/ChangePlan';
import ManagePayment from './pages/ManagePayment';
import BackupPayment from './pages/BackupPayment';
import PaymentHistory from './pages/PaymentHistory';
import CancelMembership from './pages/CancelMembership';
import BuyExtraMember from './pages/BuyExtraMember';
import ShareNetflix from './pages/ShareNetflix';
import Redeem from './pages/Redeem';
import Devices from './pages/Devices';
import SignOut from './pages/SignOut';
import UpdatePassword from './pages/UpdatePassword';
import EditSettings from './pages/EditSettings';
import Language from './pages/Language';
import ManageDevices from './pages/ManageDevices';
import Playback from './pages/Playback';
import Subtitles from './pages/Subtitles';
import ParentalControls from './pages/ParentalControls';
import ManageProfile from './pages/ManageProfile';
import Overview from './pages/Overview';
import Membership from './pages/Membership';
import Security from './pages/Security';
import Profile from './pages/Profile';
import HelpCenter from './pages/HelpCenter';
import TransferProfile from './pages/TransferProfile';
import PersonalInfo from './pages/PersonalInfo';
import DeleteAccount from './pages/DeleteAccount';
import FinishSetup from './components/FinishSetup';
import AddPhone from './pages/AddPhone';
import SignInCode from './pages/SignInCode';
import ChangePassword from './pages/ChangePassword';
import MobileDownloads from './pages/MobileDownloads';
import Account from './pages/Account';
import AccountLayout from './layouts/AccountLayout';

function AppWrapper() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkAuth = () => {
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!user);
    };
    checkAuth();
    window.addEventListener('authChanged', checkAuth);
    return () => {
      window.removeEventListener('authChanged', checkAuth);
    };
  }, []);

  const hideNavbarRoutes = [
    '/membership', '/change-plan', '/manage-payment', '/backup-payment', '/redeem',
    '/devices', '/signout', '/language', '/playback', '/subtitles', '/parental-controls',
    '/manage-profile', '/overview', '/membership-details', '/security', '/profile',
    '/help', '/transfer',
  ];

  const shouldShowNavbar = isAuthenticated && !hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavbar && <Navbar />}
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signin-code" element={<SignInCode />} />
          <Route path="/register" element={<Register />} />
          <Route path="/finish-setup" element={<FinishSetup />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Landing />} />
          <Route path="/movie/:id" element={isAuthenticated ? <MovieDetails /> : <Navigate to="/login" />} />
          <Route path="/subscribe" element={isAuthenticated ? <Subscribe /> : <Navigate to="/login" />} />
          <Route path="/profiles" element={isAuthenticated ? <Profiles /> : <Navigate to="/login" />} />
          <Route path="/tv-shows" element={isAuthenticated ? <TVShows /> : <Navigate to="/login" />} />
          <Route path="/change-email" element={isAuthenticated ? <ChangeEmail /> : <Navigate to="/login" />} />
          <Route path="/request-code" element={<RequestCode />} />
          <Route path="/edit-profile" element={isAuthenticated ? <EditProfile /> : <Navigate to="/login" />} />
          <Route path="/my-list" element={isAuthenticated ? <MyList /> : <Navigate to="/login" />} />
          <Route path="/movies" element={isAuthenticated ? <MoviesPage /> : <Navigate to="/login" />} />
          <Route path="/new-popular" element={isAuthenticated ? <NewPopularPage /> : <Navigate to="/login" />} />
          <Route path="/languages" element={isAuthenticated ? <LanguagesPage /> : <Navigate to="/login" />} />
        <Route element={<AccountLayout />}>
          <Route path="/change-plan" element={isAuthenticated ? <ChangePlan /> : <Navigate to="/login" />} />
          <Route path="/manage-payment" element={isAuthenticated ? <ManagePayment /> : <Navigate to="/login" />} />
          <Route path="/backup-payment" element={isAuthenticated ? <BackupPayment /> : <Navigate to="/login" />} />
          <Route path="/games" element={isAuthenticated ? <Games /> : <Navigate to="/login" />} />
          <Route path="/update-password" element={<UpdatePassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/redeem" element={isAuthenticated ? <Redeem /> : <Navigate to="/login" />} />
          <Route path="/edit-settings" element={<EditSettings />} />
          <Route path="/add-phone" element={<AddPhone />} />
          <Route path="/manage-membership" element={<ManageMembership />} />
          <Route path="/payment-history" element={<PaymentHistory />} />
          <Route path="/cancel-membership" element={<CancelMembership />} />
          <Route path="/mobile-downloads" element={<MobileDownloads />} />
          <Route path="/access-devices" element={<ManageDevices />} />
          <Route path="/devices" element={isAuthenticated ? <Devices /> : <Navigate to="/login" />} />
          <Route path="/signout" element={<SignOut />} />
          <Route path="/language-preferences" element={isAuthenticated ? <LanguagePreferences /> : <Navigate to="/login" />} />
          <Route path="/language" element={isAuthenticated ? <Language /> : <Navigate to="/login" />} />
          <Route path="/playback" element={isAuthenticated ? <Playback /> : <Navigate to="/login" />} />
          <Route path="/subtitles" element={isAuthenticated ? <Subtitles /> : <Navigate to="/login" />} />
          <Route path="/parental-controls" element={isAuthenticated ? <ParentalControls /> : <Navigate to="/login" />} />
          <Route path="/manage-profile" element={isAuthenticated ? <ManageProfile /> : <Navigate to="/login" />} />
          <Route path="/overview" element={isAuthenticated ? <Overview /> : <Navigate to="/login" />} />
          <Route path="/membership" element={isAuthenticated ? <Account /> : <Navigate to="/login" />} />
          <Route path="/personal-info" element={<PersonalInfo />} />
          <Route path="/membership-details" element={isAuthenticated ? <Membership /> : <Navigate to="/login" />} />
          <Route path="/buy-extra-member" element={<BuyExtraMember />} />
          <Route path="/share-netflix" element={<ShareNetflix />} />
          <Route path="/security" element={isAuthenticated ? <Security /> : <Navigate to="/login" />} />
          <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/transfer-profile" element={<TransferProfile />} />
          <Route path="/help" element={isAuthenticated ? <HelpCenter /> : <Navigate to="/login" />} />
          <Route path="/delete-account" element={<DeleteAccount />} />
          <Route path="/transfer" element={isAuthenticated ? <TransferProfile /> : <Navigate to="/login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppWrapper />
    </BrowserRouter>
  );
}

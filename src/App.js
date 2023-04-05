import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import {
  Tool,
  SavedRecords,
  HeaderAfterAuth,
  TransactionHistory,
  HomePage,
  NotFound,
  HeaderNew,
  PrivacyPolicy,
  TermsOfServices,
} from "./components/layout";
import {
  LogIn,
  SignIn,
  Forgot,
  PasswordReset,
  Profile,
} from "./components/auth";

function App() {
  return (
    <div className="">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
              // wordBreak: 'break-all',
              wordBreak: 'break-word',
              // whiteSpace: "nowrap",
              width: 'max-content',
          }
      }}
    />
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/generator" element={<HeaderAfterAuth ><Tool /></HeaderAfterAuth>} />
          <Route path="/auth/signin" element={<HeaderNew ><LogIn /></HeaderNew>}   />
          <Route path="/auth/register" element={<HeaderNew ><SignIn /></HeaderNew>}  />
          <Route path="/auth/forgot" element={<HeaderNew ><Forgot /></HeaderNew>}  />
            <Route path="/reset-password" element={<HeaderNew ><PasswordReset /></HeaderNew>}  />
          <Route path="/bookmarks" element={<HeaderAfterAuth ><SavedRecords /></HeaderAfterAuth>}  />
          <Route path="/transaction-history" element={<HeaderAfterAuth ><TransactionHistory /></HeaderAfterAuth>}  />
          <Route path="/profile" element={<HeaderAfterAuth ><Profile /></HeaderAfterAuth>}  />
          <Route path='/terms-of-use' element={<TermsOfServices />}/>
          <Route path='/privacy-policy' element={<PrivacyPolicy />}/>
          <Route path='*' element={<NotFound />}/>
        </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

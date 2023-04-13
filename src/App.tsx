import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
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
} from './components/layout'
import {
  LogIn,
  SignIn,
  Forgot,
  PasswordReset,
  Profile,
} from './components/auth'
import RouteMiddleWare from './utils/RouteMiddleWare'
import React from 'react'

function App() {
  return (
    <div className="">
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          style: {
            wordBreak: 'break-word',
            width: 'max-content',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/generator"
            element={
              <RouteMiddleWare>
                <HeaderAfterAuth>
                  <Tool />
                </HeaderAfterAuth>
              </RouteMiddleWare>
            }
          />
          <Route
            path="/auth/signin"
            element={
              <HeaderNew>
                <LogIn />
              </HeaderNew>
            }
          />
          <Route
            path="/auth/register"
            element={
              <HeaderNew>
                <SignIn />
              </HeaderNew>
            }
          />
          <Route
            path="/auth/forgot"
            element={
              <HeaderNew>
                <Forgot />
              </HeaderNew>
            }
          />
          <Route
            path="/reset-password"
            element={
              <HeaderNew>
                <PasswordReset />
              </HeaderNew>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <RouteMiddleWare>
                <HeaderAfterAuth>
                  <SavedRecords />
                </HeaderAfterAuth>
              </RouteMiddleWare>
            }
          />
          <Route
            path="/transaction-history"
            element={
              <RouteMiddleWare>
                <HeaderAfterAuth>
                  <TransactionHistory />
                </HeaderAfterAuth>
              </RouteMiddleWare>
            }
          />
          <Route
            path="/profile"
            element={
              <RouteMiddleWare>
                <HeaderAfterAuth>
                  <Profile />
                </HeaderAfterAuth>
              </RouteMiddleWare>
            }
          />
          <Route path="/terms-of-use" element={<TermsOfServices />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

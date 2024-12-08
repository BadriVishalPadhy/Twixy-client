import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  <GoogleOAuthProvider clientId="<your_client_id>">
  return <Component {...pageProps} />;
  </GoogleOAuthProvider>
}

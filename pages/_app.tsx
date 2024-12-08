import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';

export default function App({ Component, pageProps }: AppProps) {
  return(
   <div>
     <GoogleOAuthProvider clientId="506618002537-hh8ahj36a2nqejgcmv3a8fp645edvtfj.apps.googleusercontent.com">
    <Component {...pageProps} />;
    </GoogleOAuthProvider>
   </div>
  )

}

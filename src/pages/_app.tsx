import Navbar from "@/components/layouts/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

const disableNavbar = ["/auth/login", "/auth/register"];

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const { pathname } = useRouter();

  return (
    <SessionProvider session={session}>
      <div>
        {!disableNavbar.includes(pathname) && <Navbar />}
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}

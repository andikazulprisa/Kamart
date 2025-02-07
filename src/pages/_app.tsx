import Navbar from "@/components/fragments/Navbar";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "boxicons/css/boxicons.min.css";

const disableNavbar = [
  "/auth/login",
  "/auth/register",
  "/home",
  "/home/profile",
  "/home/products",
];

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

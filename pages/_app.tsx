import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import { Router } from "next/router";
import React from "react";
import { useAppLoader } from "@/hooks/useAppLoader";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useAppLoader();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          {isLoading ? (
            <div className="fixed inset-0  text-white flex justify-center items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-16 h-16 animate-spin text-brand-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"
                />
              </svg>
            </div>
          ) : (
            <Component {...pageProps} />
          )}
          {/* <Component {...pageProps} /> */}
        </Layout>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

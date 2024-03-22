import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import type { AppProps } from "next/app";
import React from "react";
import { useAppLoader } from "@/hooks/useAppLoader";
import Loader from "../components/Loader";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const { isLoading } = useAppLoader();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Layout>
          {isLoading ? (
            <div className="fixed inset-0 flex items-center justify-center text-white">
              <Loader size='lg' />
            </div>
          ) : (
            <Component {...pageProps} />
          )}
        </Layout>
        <Toaster />
      </QueryClientProvider>
    </>
  );
}

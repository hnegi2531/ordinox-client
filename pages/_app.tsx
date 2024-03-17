import Layout from "@/components/Layout";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import Cookies from 'js-cookie';

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  // Cookies.set("auth_token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxNzY4NjQ0NjY0NjAzODQ0NjA5IiwiaXNzIjoib3JkaW5veCIsInN1YiI6InR3aXR0ZXJhdXRoIiwiYXVkIjpbIm5vbmUiXSwiZXhwIjoxNzExMjEwMDk0LCJuYmYiOjE3MTA2MDUyOTQsImlhdCI6MTcxMDYwNTI5NCwianRpIjoiMTc2ODY0NDY2NDYwMzg0NDYwOSJ9.b119NkJUQDkwm6MchmAI4PU3BsTqaeXeU_FJFf0PRNQ");
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

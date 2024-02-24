"use client";

import Header from "@/components/header";
import { Sidebar } from "@/components/sidebar";
import { NextUIProvider } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const router = useRouter()

  const pathnames: string[] = ['/auth', '/auth/check_password', '/auth/reset_password']

  useEffect(() => {
    if (localStorage.getItem('token') && pathnames.find(p => p === pathName)) {
      router.push('/')
    } else if (!localStorage.getItem('token') && !pathnames.find(p => p === pathName)) {
      router.push('/auth')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathName])
  return (
    <NextUIProvider className="flex h-screen flex-col bg-background text-foreground">
      <Header />
      {!pathnames.find(p => p === pathName) ? (
        <div className="flex h-full flex-col-reverse items-start sm:flex-row">
          <Sidebar />
          <div className="h-full w-full bg-content1">{children}</div>
        </div>
      ) : (
        children
      )}
    </NextUIProvider>
  );
}

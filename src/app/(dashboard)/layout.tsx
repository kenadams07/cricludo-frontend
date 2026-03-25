"use client";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { Spinner } from "@/components/ui/shadcn-io/spinner";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } = useDashboardSummary();

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/75">
        <Spinner />
      </div>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Gift } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
 
import { Tabs, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAppConfig,
  useGetAllGifts,
} from "@/hooks/useAppConfig";
import { GiftGrid } from "@/components/gift-grid";
import { AddGiftDialog } from "@/components/add-gift-dialog";
 
export default function AppConfigPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const getUserType = useAuthStore((s) => s.getUserType);
  const setTitle = useAuthStore((t) => t.setTitle);
  const { data, isLoading, mutate } = useAppConfig();
  const {
    data: giftsData,
    isLoading: giftsLoading,
    mutate: mutateGifts,
  } = useGetAllGifts();

  const userType = getUserType();
  const config = data?.data || {};
  const gifts = giftsData?.data || [];

  useEffect(() => {
    setTitle("App Configuration");
    if (userType && !["admin"].includes(userType)) {
      router.replace("/");
    }
  }, [userType, router, setTitle]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }
 
  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center gap-2">
        <Gift className="h-6 w-6" />
        <h1 className="text-3xl font-bold">Gifts</h1>
      </div>

      <Tabs defaultValue="gifts" className="w-full">
      
 
        <TabsContent value="gifts" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gift Management</CardTitle>
 
              </div>
              <AddGiftDialog onGiftAdded={() => mutateGifts()} />
            </CardHeader>
            <CardContent>
              {giftsLoading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-muted-foreground">Loading gifts...</div>
                </div>
              ) : (
                <GiftGrid data={gifts} />
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

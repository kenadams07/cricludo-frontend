"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Settings, Save } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useAppConfig,
  useUpdateAppConfig,
  useGetAllGifts,
} from "@/hooks/useAppConfig";
import { toast } from "sonner";
import { GiftGrid } from "@/components/gift-grid";
import { AddGiftDialog } from "@/components/add-gift-dialog";
import { BannerConfig } from "./banner-config";

/**
 * General Settings Component
 * Manages basic app configuration
 */
function GeneralSettings({
  config,
  onUpdate,
}: {
  config: any;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    appName: config?.appName || "",
    version: config?.version || "",
    maintenanceMode: config?.maintenanceMode || false,
    guestAllowed: config?.guestAllowed || false,
    freeUpdate: config?.freeUpdate || false,
    freeCoin: config?.freeCoin || false,
    initialCons: config?.initialCons || 0,
  });

  const { trigger: updateTrigger, isMutating } = useUpdateAppConfig();
  const { mutate } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTrigger(formData);
      toast.success("General settings updated successfully");
      mutate();
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>General Settings</CardTitle>
        <CardDescription>Basic app configuration settings</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="appName">App Name</Label>
              <Input
                id="appName"
                value={formData.appName}
                onChange={(e) =>
                  setFormData({ ...formData, appName: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="version">Version</Label>
              <Input
                id="version"
                value={formData.version}
                onChange={(e) =>
                  setFormData({ ...formData, version: e.target.value })
                }
              />
            </div>
          </div>

          <div>
            <Label htmlFor="initialCons">Initial Cons</Label>
            <Input
              id="initialCons"
              type="number"
              value={formData.initialCons}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  initialCons: Number(e.target.value),
                })
              }
              min={0}
            />
          </div>

          <div className="space-y-3">
            {[
              { id: "maintenanceMode", label: "Maintenance Mode" },
              { id: "guestAllowed", label: "Guest Allowed" },
              { id: "freeUpdate", label: "Free Update" },
              { id: "freeCoin", label: "Free Coin" },
            ].map(({ id, label }) => (
              <div key={id} className="flex items-center gap-3">
                <Checkbox
                  id={id}
                  checked={(formData as any)[id]}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      [id]: checked as boolean,
                    })
                  }
                />
                <Label htmlFor={id} className="cursor-pointer">
                  {label}
                </Label>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isMutating}>
              <Save className="h-4 w-4 mr-2" />
              {isMutating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * Bonus Settings Component
 * Configures daily and referral bonuses
 */
function BonusSettings({
  config,
  onUpdate,
}: {
  config: any;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    dailyBonusCons: config?.dailyBonusCons || 0,
    dailyBonusIntervalHours: config?.dailyBonusIntervalHours || 24,
    dailyBonusEnabled: config?.dailyBonusEnabled || false,
    dailyBonusAmount: config?.dailyBonusAmount || 0,
    referralBonusCons: config?.referralBonusCons || 0,
    referralBonusEnabled: config?.referralBonusEnabled || false,
    referralBonusLimitPerUser: config?.referralBonusLimitPerUser || 0,
  });

  const { trigger: updateTrigger, isMutating } = useUpdateAppConfig();
  const { mutate } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTrigger(formData);
      toast.success("Bonus settings updated successfully");
      mutate();
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Bonus Settings</CardTitle>
        <CardDescription>
          Configure daily and referral bonus settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <h3 className="text-sm font-semibold mb-3">Daily Bonus</h3>
            <div className="space-y-4 pl-4 border-l-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="dailyBonusEnabled"
                  checked={formData.dailyBonusEnabled}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      dailyBonusEnabled: checked as boolean,
                    })
                  }
                />
                <Label htmlFor="dailyBonusEnabled" className="cursor-pointer">
                  Enable Daily Bonus
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="dailyBonusCons">Daily Bonus Cons</Label>
                  <Input
                    id="dailyBonusCons"
                    type="number"
                    value={formData.dailyBonusCons}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dailyBonusCons: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="dailyBonusAmount">Daily Bonus Amount</Label>
                  <Input
                    id="dailyBonusAmount"
                    type="number"
                    value={formData.dailyBonusAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dailyBonusAmount: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="dailyBonusIntervalHours">
                  Interval Hours (Default: 24)
                </Label>
                <Input
                  id="dailyBonusIntervalHours"
                  type="number"
                  value={formData.dailyBonusIntervalHours}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      dailyBonusIntervalHours: Number(e.target.value),
                    })
                  }
                  min={1}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-3">Referral Bonus</h3>
            <div className="space-y-4 pl-4 border-l-2">
              <div className="flex items-center gap-3">
                <Checkbox
                  id="referralBonusEnabled"
                  checked={formData.referralBonusEnabled}
                  onCheckedChange={(checked) =>
                    setFormData({
                      ...formData,
                      referralBonusEnabled: checked as boolean,
                    })
                  }
                />
                <Label
                  htmlFor="referralBonusEnabled"
                  className="cursor-pointer"
                >
                  Enable Referral Bonus
                </Label>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="referralBonusCons">Referral Bonus Cons</Label>
                  <Input
                    id="referralBonusCons"
                    type="number"
                    value={formData.referralBonusCons}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referralBonusCons: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
                <div>
                  <Label htmlFor="referralBonusLimitPerUser">
                    Limit Per User
                  </Label>
                  <Input
                    id="referralBonusLimitPerUser"
                    type="number"
                    value={formData.referralBonusLimitPerUser}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        referralBonusLimitPerUser: Number(e.target.value),
                      })
                    }
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isMutating}>
              <Save className="h-4 w-4 mr-2" />
              {isMutating ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

/**
 * Store Config Component
 * Manages Apple Store and Google Play Store settings
 */
function StoreConfig({
  config,
  onUpdate,
}: {
  config: any;
  onUpdate: () => void;
}) {
  const [formData, setFormData] = useState({
    appleStoreConfig: {
      isEnabled: config?.appleStoreConfig?.isEnabled || false,
      appId: config?.appleStoreConfig?.appId || "",
      appUrl: config?.appleStoreConfig?.appUrl || "",
    },
    googlePlayConfig: {
      isEnabled: config?.googlePlayConfig?.isEnabled || false,
      appId: config?.googlePlayConfig?.appId || "",
      appUrl: config?.googlePlayConfig?.appUrl || "",
    },
  });

  const { trigger: updateTrigger, isMutating } = useUpdateAppConfig();
  const { mutate } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateTrigger(formData);
      toast.success("Store settings updated successfully");
      mutate();
      onUpdate();
    } catch (error: any) {
      toast.error(error.message || "Failed to update settings");
    }
  };

  const StoreConfigCard = ({
    title,
    description,
    storeKey,
  }: {
    title: string;
    description: string;
    storeKey: "appleStoreConfig" | "googlePlayConfig";
  }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-3">
            <Checkbox
              id={`${storeKey}-enabled`}
              checked={formData[storeKey].isEnabled}
              onCheckedChange={(checked) =>
                setFormData({
                  ...formData,
                  [storeKey]: {
                    ...formData[storeKey],
                    isEnabled: checked as boolean,
                  },
                })
              }
            />
            <Label htmlFor={`${storeKey}-enabled`} className="cursor-pointer">
              Enable {title}
            </Label>
          </div>
          <div>
            <Label htmlFor={`${storeKey}-appId`}>App ID</Label>
            <Input
              id={`${storeKey}-appId`}
              value={formData[storeKey].appId}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [storeKey]: {
                    ...formData[storeKey],
                    appId: e.target.value,
                  },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor={`${storeKey}-appUrl`}>App URL</Label>
            <Input
              id={`${storeKey}-appUrl`}
              value={formData[storeKey].appUrl}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  [storeKey]: {
                    ...formData[storeKey],
                    appUrl: e.target.value,
                  },
                })
              }
            />
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4">
      <StoreConfigCard
        title="Apple Store Config"
        description="Configure Apple App Store settings"
        storeKey="appleStoreConfig"
      />
      <StoreConfigCard
        title="Google Play Config"
        description="Configure Google Play Store settings"
        storeKey="googlePlayConfig"
      />

      <div className="flex justify-end">
        <Button onClick={handleSubmit} disabled={isMutating}>
          <Save className="h-4 w-4 mr-2" />
          {isMutating ? "Saving..." : "Save All Changes"}
        </Button>
      </div>
    </div>
  );
}

/**
 * App Configuration Page
 * Main page component for managing app configuration
 */
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
        <Settings className="h-6 w-6" />
        <h1 className="text-3xl font-bold">App Configuration</h1>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-secondary/90 rounded-md">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="bonus">Bonus Settings</TabsTrigger>
          <TabsTrigger value="store">Store Config</TabsTrigger>
          <TabsTrigger value="gifts">Gifts</TabsTrigger>
          <TabsTrigger value="banner">Banners</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 mt-6">
          <GeneralSettings config={config} onUpdate={() => mutate()} />
        </TabsContent>

        <TabsContent value="bonus" className="space-y-4 mt-6">
          <BonusSettings config={config} onUpdate={() => mutate()} />
        </TabsContent>

        <TabsContent value="store" className="space-y-4 mt-6">
          <StoreConfig config={config} onUpdate={() => mutate()} />
        </TabsContent>

        <TabsContent value="gifts" className="space-y-4 mt-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Gift Management</CardTitle>
                <CardDescription>
                  Manage gift configurations. Click to view details.
                </CardDescription>
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
        <TabsContent value="banner" className="space-y-4 mt-6">
          <BannerConfig />
        </TabsContent>
      </Tabs>
    </div>
  );
}

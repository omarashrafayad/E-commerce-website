"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { User as UserIcon, Package, MapPin, ShieldCheck, LogOut } from "lucide-react";
import { useAuthStore } from "@/stores/useAuthStore";
import { logoutAction } from "@/features/auth/api/auth";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import NavButton from "@/components/shared/navButton";
import { toast } from "sonner";
import { User } from "@/features/auth/types/auth.types";
import ProfileSection from "../components/profileSection";
import OrdersSection from "../components/orderSetion";
import AddressesSection from "../components/addressesSection";
import SecuritySection from "../components/securitySection";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState("profile");
  const userData: User = user || {
    name: "Guest User",
    email: "guest@example.com",
    role: "user",
    active: false,
    phone: "",
    profileImg: "",
    createdAt: new Date().toISOString(),
  };

  const handleLogout = async () => {
    await logoutAction();
    logout();
    toast.success("Logged out successfully");
    router.push("/login");
  };
  return (
    <div className="container max-w-7xl mx-auto py-8 px-4 md:px-8">
      <div className="flex flex-col md:flex-row items-center gap-6 mb-10 bg-card p-6 rounded-2xl border shadow-sm">
        <Avatar className="h-24 w-24 border-4 border-primary/10">
          <AvatarImage src={userData?.profileImg} alt={userData.name} />
          <AvatarFallback className="text-2xl font-bold bg-primary/5 text-primary">
            {userData.name?.split(" ").map((n: string) => n[0]).join("").toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-center md:text-left space-y-1">
          <h1 className="text-3xl font-bold tracking-tight">{userData.name}</h1>
          <p className="text-muted-foreground">{userData.email}</p>
          <Badge variant="secondary" className="mt-2">Member since {userData.createdAt.split("T")[0]}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside className="hidden lg:block space-y-2">
          <div className="space-y-1">
            <NavButton
              active={activeTab === "profile"}
              onClick={() => setActiveTab("profile")}
              icon={<UserIcon className="w-5 h-5" />}
              label="Profile"
            />
            <NavButton
              active={activeTab === "orders"}
              onClick={() => setActiveTab("orders")}
              icon={<Package className="w-5 h-5" />}
              label="Orders"
            />
            <NavButton
              active={activeTab === "addresses"}
              onClick={() => setActiveTab("addresses")}
              icon={<MapPin className="w-5 h-5" />}
              label="Addresses"
            />
            <NavButton
              active={activeTab === "security"}
              onClick={() => setActiveTab("security")}
              icon={<ShieldCheck className="w-5 h-5" />}
              label="Security"
            />
          </div>
          <div className="pt-4 mt-4 border-t">
            <Button
              variant="destructive"
              className="w-full justify-start gap-3 h-11"
              onClick={handleLogout}
            >
              <LogOut className="w-5 h-5" />
              Logout
            </Button>
          </div>
        </aside>

        {/* Mobile Navigation */}
        <div className="lg:hidden mb-6 space-y-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full grid grid-cols-4 h-12">
              <TabsTrigger value="profile"><UserIcon className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="orders"><Package className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="addresses"><MapPin className="w-4 h-4" /></TabsTrigger>
              <TabsTrigger value="security"><ShieldCheck className="w-4 h-4" /></TabsTrigger>
            </TabsList>
          </Tabs>
          <Button
            variant="destructive"
            className="w-full gap-2 h-11"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>

        {/* Content Area */}
        <main className="min-h-[500px]">
          {activeTab === "profile" && <ProfileSection user={userData} />}
          {activeTab === "orders" && <OrdersSection />}
          {activeTab === "addresses" && <AddressesSection />}
          {activeTab === "security" && <SecuritySection />}
        </main>
      </div>
    </div>
  );
}


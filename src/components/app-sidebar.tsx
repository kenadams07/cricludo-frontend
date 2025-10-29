"use client"

import * as React from "react"
import {
   IconDashboard,
   IconUsers,
   IconUsersPlus,
   IconSettings,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
   Sidebar,
   SidebarContent,
   SidebarFooter,
   SidebarHeader,
   SidebarMenu,
   SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuthStore } from "@/store/authStore"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const data = {
   navMain: [
      {
         title: "Dashboard",
         url: "/",
         icon: IconDashboard,
      },
      {
         title: "Agents",
         url: "/agents",
         icon: IconUsers,
         hideUser: ["master", "agent"],
      },
      {
         title: "Add User",
         url: "/add-user",
         icon: IconUsersPlus,
         hideUser: ["agent"],
      },
      {
         title: "List Users",
         url: "/users/list-users",
         icon: IconUsers,
         hideUser: ["agent"],
      },
      {
         title: "App Config",
         url: "/app-config",
         icon: IconSettings,
         hideUser: ["agent", "master"],
      },
   ],
   navClouds: [],
   navSecondary: [],
   documents: [],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
   const user = useAuthStore((s) => s.user)
   return (
      <Sidebar collapsible='offcanvas' {...props}>
         <SidebarHeader>
            <SidebarMenu>
               <SidebarMenuItem>
                  <div className='text-primary-foreground flex flex-row w-full size-16 items-center justify-start gap-2 rounded-md'>
                     <Avatar className='size-10'>
                        <AvatarImage src='/Logo.png' alt='Logo' />
                        <AvatarFallback>CL</AvatarFallback>
                     </Avatar>
                     <span className='text-base font-semibold'>CircLudo</span>
                  </div>
               </SidebarMenuItem>
            </SidebarMenu>
         </SidebarHeader>
         <SidebarContent>
            <NavMain items={data.navMain} />
            {/* <NavDocuments items={data.documents} /> */}
            <NavSecondary items={data.navSecondary} className='mt-auto' />
         </SidebarContent>
         <SidebarFooter>
            <NavUser user={user} />
         </SidebarFooter>
      </Sidebar>
   )
}

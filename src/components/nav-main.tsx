"use client"

import { type Icon } from "@tabler/icons-react"

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useRouter } from "next/navigation"
import { useAuthStore } from "@/store/authStore"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    hideUser?: string[]
  }[]
}) {
  const router = useRouter();
  const userType = useAuthStore((u) => u.getUserType);
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            if((item?.hideUser ?? []).includes(userType())){
              return null;
            }
            return (
            <SidebarMenuItem key={item.title} >
              <SidebarMenuButton tooltip={item.title} onClick={() => router.push(item.url)} className="cursor">
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

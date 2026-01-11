import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "~/components/ui/sidebar";

import { FiBookOpen, FiUser, FiSettings } from "react-icons/fi";
import { RxLightningBolt } from "react-icons/rx";
import { RiBankLine } from "react-icons/ri";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { ChevronUp, User2 } from "lucide-react";
import { Link, NavLink } from "react-router";

export default function AppSidebar() {
  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: RxLightningBolt },
    { name: "Pedidos", href: "dashboard/orders", icon: FiBookOpen },
    { name: "Clientes", href: "dashboard/customers", icon: FiUser },
    { name: "Tesoreria", href: "dashboard/treasury", icon: RiBankLine },
    { name: "Ajustes", href: "dashboard/settings", icon: FiSettings },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
            Zas
          </h1>
          <p className="text-center text-sm text-muted-foreground">
            Una aplicación de gestión de tus finanzas
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem>
              <SidebarMenuButton>
                <item.icon className="h-6 w-6" />
                <NavLink
                  to={item.href}
                  className={({ isActive, isPending, isTransitioning }) =>
                    [
                      isActive ? "text-primary" : "text-muted-foreground",
                      isPending
                        ? "text-muted-foreground"
                        : "text-muted-foreground",
                      isTransitioning
                        ? "text-muted-foreground"
                        : "text-muted-foreground",
                    ].join(" ")
                  }
                >
                  {item.name}
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

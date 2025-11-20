import * as React from 'react';
import { useAuth } from '@/hooks/useAuth';
import {
  IconDashboard,
  IconInnerShadowTop,
  IconMicrophone2,
  IconConfetti,
  IconTheater,
  IconMusic,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { useLocation, useNavigate } from 'react-router';
import { useEffect } from 'react';
import { toast } from 'sonner';

const data = {
  user: {
    name: 'shadcn',
    email: 'm@example.com',
    avatar: '/avatars/shadcn.jpg',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: IconDashboard,
    },
    {
      title: 'Festivals',
      url: '/festivals',
      icon: IconConfetti,
    },
    {
      title: 'Stages',
      url: '#',
      icon: IconTheater,
    },
    {
      title: 'Performers',
      url: '#',
      icon: IconMicrophone2,
    },
    {
      title: 'Shows',
      url: '#',
      icon: IconMusic,
    },
  ],
};

export function AppSidebar({ ...props }) {
  const location = useLocation();
  const navigate = useNavigate();
  const { token } = useAuth();

  useEffect(() => {
    if (location.state?.message) {
      if (location.state.type === 'success') {
        toast.success(location.state.message, {
          duration: 4000,
          closeButton: true,
        });
      } else if (location.state.type === 'error') {
        toast.error(location.state.message, {
          duration: 4000,
          closeButton: true,
        });
      }
      navigate(location.pathname, { replace: true });
    }
  }, [location.state]);

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      {token && (
        <SidebarFooter>
          <NavUser user={data.user} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}

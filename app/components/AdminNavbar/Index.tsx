"use client"

import ClientSideLink from '@/app/(admin)/admin/client-side-link';
import React, { useState } from 'react'
import {
    HomeIcon,
    UserGroupIcon,
    EnvelopeIcon,
    QuestionMarkCircleIcon,
  } from "@heroicons/react/24/outline";
import { DownloadIcon, GalleryThumbnails, HeartHandshake, PaperclipIcon, Workflow, LinkIcon, BriefcaseBusinessIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useRefetchServices } from '@/app/contexts/refetchServices';
import { toast } from 'sonner';
import { RiProductHuntLine } from 'react-icons/ri';
import { Settings } from 'lucide-react';


const AdminNavbar = () => {

    const [openLink, setOpenLink] = useState<string | null>(null);
    const {refetchServices} = useRefetchServices();
    
    useEffect(() => {
      fetchServiceData()
  },[refetchServices])
  
  const [serviceData, setServiceData] = useState([])


  const fetchServiceData = async () => {
    try {
        const response = await fetch(`/api/admin/services`);
        if (response.ok) {
            const data = await response.json();
            console.log(data)
            setServiceData(data.data.thirdSection.items);
        } else {
            const data = await response.json();
            toast.error(data.message);
        }
    } catch (error) {
        console.log("Error in fetching service data", error);
    }
}



    const navItems = [
        { name: "Home", href: "/admin/home", icon: HomeIcon },
        { name: "About", href: "/admin/about", icon: UserGroupIcon },
        { name: "Services", href: "#", icon: EnvelopeIcon,hasChild:true,children: [
          { name: "Main Page", href: "/admin/services" },
          { name: "Services Section", href: "/admin/services/services-section" },
            ...serviceData.map((service: { _id: string,thumbnailTitle:string }) => (
              { name: service.thumbnailTitle.split(" ").slice(0,2).join(" ") + "...", href: `/admin/services/${service._id}` }
            )),
          ] },
          { name: "Products", href: "/admin/products", icon: RiProductHuntLine },
        { name: "Projects", href: "/admin/projects", icon: Workflow },
        { name: "Gallery", href: "/admin/gallery", icon: GalleryThumbnails },
        { name: "Contact", href: "###", icon: EnvelopeIcon,hasChild:true,children: [
          { name: "Main Page", href: "/admin/contact" },
          {name:"Enquiries",href:"/admin/contact/enquiries"}
        ] },
        { name: "Faq", href: "/admin/faq", icon: QuestionMarkCircleIcon },
        { name: "QHSE", href: "/admin/qhse", icon: HeartHandshake },
        { name: "Blogs", href: "/admin/blogs", icon: PaperclipIcon },
        { name: "Downloads", href: "/admin/downloads", icon: DownloadIcon },
        { name: "Careers", href: "####", icon: BriefcaseBusinessIcon,hasChild:true,children:[
          { name: "Main Page", href: "/admin/careers" },
          {name:"Enquiries",href:"/admin/careers/enquiries"}
        ] },
        { name: "Sitemap", href: "/admin/sitemap", icon: LinkIcon },
        { name: "Settings", href: "/admin/settings", icon: Settings},
      ];

  return (
    navItems.map((item) => {
        const Icon = item.icon;
        return (
          <ClientSideLink
            key={item.href}
            href={item.href}
            name={item.name}
            icon={<Icon className="h-5 w-5" />}
            isOpen={openLink === item.href}
            setOpenLink={setOpenLink}
            hasChild={item.hasChild}
          >
            {item.children}
          </ClientSideLink>
        );
      })
  )
}

export default AdminNavbar
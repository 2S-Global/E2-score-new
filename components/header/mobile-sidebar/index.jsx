"use client";

import Link from "next/link";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";

//import mobileMenuData from "../../../data/mobileMenuData";
import mobileMenuData from "../../../data/mobileMenuDatatry";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";
import {
  isActiveParent,
  isActiveLink,
  isActiveParentChaild,
} from "../../../utils/linkActiveChecker";
import { usePathname, useRouter } from "next/navigation";
import {
  blogItems,
  candidateItems,
  employerItems,
  findJobItems,
  homeItems,
  pageItems,
  shopItems,
  about,
  contact,
} from "../../../data/mainMenuData";
;

const Index = () => {
  const router = useRouter();

  return (
    <div
      className="offcanvas offcanvas-start mobile_menu-contnet"
      tabIndex="-1"
      id="offcanvasMenu"
      data-bs-scroll="true"
    >
      <SidebarHeader />
      {/* End pro-header */}

      {/*   <Sidebar>
          <Menu>
            {mobileMenuData.map((item) => (
              <SubMenu
                className={
                  isActiveParentChaild(item.items, usePathname())
                    ? "menu-active"
                    : ""
                }
                label={item.label}
                key={item.id}
              >
                {item.items.map((menuItem, i) => (
                  <MenuItem

                  onClick={()=>router.push(menuItem.routePath)}
                    className={
                      isActiveLink(menuItem.routePath, usePathname())
                        ? "menu-active-link"
                        : ""
                    }
                    key={i}
                    routerLink={<Link href={menuItem.routePath} />}
                  >
                    {menuItem.name}
                  </MenuItem>
                ))}
              </SubMenu>
            ))}
          </Menu>
        </Sidebar> */}

      <Sidebar>
        {/* <Menu>
          {mobileMenuData.map((item) =>
            item.items && item.items.length > 0 ? ( // Check if there are submenu items
              <SubMenu
                className={
                  isActiveParentChaild(item.items, usePathname())
                    ? "menu-active"
                    : ""
                }
                label={item.label}
                key={item.id}
              >
                {item.items.map((menuItem, i) => (
                  <MenuItem
                    onClick={() => router.push(menuItem.routePath)}
                    className={
                      isActiveLink(menuItem.routePath, usePathname())
                        ? "menu-active-link"
                        : ""
                    }
                    key={i}
                  >
                    {menuItem.label}
                  </MenuItem>
                ))}
              </SubMenu>
            ) : (
              <MenuItem
                onClick={() => router.push(item.routePath)}
                className={
                  isActiveLink(item.routePath, usePathname())
                    ? "menu-active-link"
                    : ""
                }
                key={item.id}
              >
                {item.label}
              </MenuItem>
            ),
          )}
        </Menu> */}
        <Menu>
           <MenuItem
                onClick={() => router.push('/')}
                className={
                  isActiveLink('/', usePathname())
                    ? "menu-active-link"
                    : ""
                }
                key='/'
              >
               Home
              </MenuItem>
               { typeof window !== "undefined" && localStorage.getItem("employer_token") ? null : ( <MenuItem
                onClick={() => router.push('/job-list')}
                className={
                  isActiveLink('/job-list', usePathname())
                    ? "menu-active-link"
                    : ""
                }
                key='/job-list'
              >
               Jobs
              </MenuItem> )}
              { typeof window !== "undefined" && localStorage.getItem("candidate_token") ? null : ( <MenuItem
                onClick={() => router.push('/candidates-list')}
                className={
                  isActiveLink('/candidates-list', usePathname())
                    ? "menu-active-link"
                    : ""
                }
                key='/candidates-list'
              >
               Candidates
              </MenuItem> )}

                <MenuItem
                onClick={() => router.push('/candidates-list')}
                className={
                  isActiveLink('/blog-list', usePathname())
                    ? "menu-active-link"
                    : ""
                }
                key='/blog-list'
              >
               Blog
              </MenuItem> 
               <MenuItem
                onClick={() => router.push('/about')}
                className={
                  isActiveLink('/about', usePathname())
                    ? "menu-active-link"
                    : ""
                }
                key='/about'
              >
               About
              </MenuItem> 
               <MenuItem
                onClick={() => router.push('/contact')}
                className={
                  isActiveLink('/contact', usePathname())
                    ? "menu-active-link"
                    : ""
                }
                key='/contact'
              >
               Contact
              </MenuItem> 
        </Menu>
        
      </Sidebar>

      <SidebarFooter />
    </div>
  );
};

export default Index;

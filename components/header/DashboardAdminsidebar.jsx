"use client";

import Link from "next/link";
import employerMenuData from "../../data/adminMenuData";
import { isActiveLink } from "../../utils/linkActiveChecker";

import { useDispatch, useSelector } from "react-redux";
import { menuToggle } from "../../features/toggle/toggleSlice.js";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./DashboardAdminSidebar.module.css";

const DashboardEmployerSidebar = () => {
  const { menu } = useSelector((state) => state.toggle || {});
  const dispatch = useDispatch();
  const pathname = usePathname();

  const [openMenu, setOpenMenu] = useState(null);

  const menuToggleHandler = () => {
    dispatch(menuToggle());
  };

  const handleSubMenu = (id) => {
    setOpenMenu(openMenu === id ? null : id);
  };

  // ✅ Auto open submenu when active
  useEffect(() => {
    employerMenuData.forEach((item) => {
      if (
        item.subMenu &&
        item.subMenu.some((sub) => isActiveLink(sub.routePath, pathname))
      ) {
        setOpenMenu(item.id);
      }
    });
  }, [pathname]);

  return (
    <div className={`user-sidebar ${menu ? "sidebar_open" : ""}`}>
      {/* Mobile Close */}
      <div className="pro-header text-end pb-0 mb-0 show-1023">
        <div className="fix-icon" onClick={menuToggleHandler}>
          <span className="flaticon-close"></span>
        </div>
      </div>

      {/* Title */}
      <p className={styles.adminTitle}>Admin Panel</p>

      <div className="sidebar-inner">
        <ul className="navigation">
          {employerMenuData.map((item) => {
            const isParentActive =
              item.subMenu &&
              item.subMenu.some((sub) => isActiveLink(sub.routePath, pathname));

            return (
              <li
                key={item.id}
                className={`mb-1 ${
                  isActiveLink(item.routePath, pathname) || isParentActive
                    ? "active"
                    : ""
                }`}
              >
                {/* ✅ MENU WITH SUBMENU */}
                {item.subMenu ? (
                  <>
                    <a
                      onClick={() => handleSubMenu(item.id)}
                      className="d-flex justify-content-between align-items-center"
                      style={{ cursor: "pointer" }}
                    >
                      <span>
                        <i className={`la ${item.icon}`}></i> {item.name}
                      </span>

                      <i
                        className={`la ${
                          openMenu === item.id
                            ? "la-angle-down"
                            : "la-angle-right"
                        }`}
                      ></i>
                    </a>

                    {/* ✅ SUBMENU */}
                    {openMenu === item.id && (
                      <ul className="sub-menu" style={{ marginLeft:"30px" }}>
                        {item.subMenu.map((sub) => (
                          <li
                            key={sub.id}
                            className={
                              isActiveLink(sub.routePath, pathname)
                                ? "active"
                                : ""
                            }
                            onClick={menuToggleHandler}
                          >
                            <Link href={sub.routePath}>{sub.name}</Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </>
                ) : (
                  /* ✅ NORMAL MENU */
                  <Link href={item.routePath} onClick={menuToggleHandler}>
                    <i className={`la ${item.icon}`}></i> {item.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployerSidebar;

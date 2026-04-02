module.exports = [
  {
    id: 1,
    name: "Dashboard Admin",
    icon: "la-home",
    routePath: "/admin/dashboard",
    active: "active",
  },
  {
    id: 2,
    name: "List Company",
    icon: "la-building",
    routePath: "/admin/listcompany",
    active: "",
  },
  {
    id: 3,
    name: "List Institute",
    icon: "la-file-alt",
    routePath: "/admin/listinstitute",
    active: "",
  },
  {
    id: 4,
    name: "List Candidate",
    icon: "la-id-badge",
    routePath: "/admin/listcandidate",
    active: "",
  },
  {
    id: 5,
    name: "List Package",
    icon: "la-id-badge",
    routePath: "/admin/listpackage",
    active: "",
  },

  // ✅ COLLAPSE MENU START
  {
    id: 6,
    name: "Manage CMS",
    icon: "la-cogs",
    active: "",
    subMenu: [
      {
        id: 62,
        name: "Manage Banner",
        routePath: "/admin/manage-banner",
      },
      {
        id: 61,
        name: "About Page",
        routePath: "/admin/aboutpage",
      },

      {
        id: 63,
        name: "Testimonials",
        routePath: "/admin/testimonial",
      },
      {
        id: 64,
        name: "Manage Services",
        routePath: "/admin/manage-services",
      },
      {
        id: 65,
        name: "Manage Client",
        routePath: "/admin/manage-client",
      },
      {
        id: 66,
        name: "Contact Message",
        routePath: "/admin/contact-message",
      },
      {
        id: 67,
        name: "Contact Info",
        routePath: "/admin/manage-contactinfo",
      },
    ],
  },
  // ✅ COLLAPSE MENU END
];

module.exports = [
  {
    id: 1,
    label: "Dashboard",
    routePath: "/admin/dashboard",
  },
  {
    id: 2,
    label: "List Company",
    routePath: "/admin/listcompany",
  },
  // {
  //   id: 3,
  //   label: "List Company Self",
  //   routePath: "/admin/listcompanyself",
  // },

  {
    id: 3,
    label: "List Institute",
    routePath: "/admin/listinstitute",
  },

  {
    id: 4,
    label: "List Candidate",
    routePath: "/admin/listcandidate",
  },

  {
    id: 5,
    label: "List Packages",
    routePath: "/admin/listpackage",
  },
 // ✅ COLLAPSE MENU START
  {
    id: 6,
    label: "Manage CMS",
    icon: "la-cogs",
    active: "",
    items: [
      {
        id: 62,
        label: "Manage Banner",
        routePath: "/admin/manage-banner",
      },
      {
        id: 61,
        label: "About Page",
        routePath: "/admin/aboutpage",
      },

      {
        id: 63,
        label: "Testimonials",
        routePath: "/admin/testimonial",
      },
      {
        id: 64,
        label: "Manage Services",
        routePath: "/admin/manage-services",
      },
      {
        id: 65,
        label: "Manage Client",
        routePath: "/admin/manage-client",
      },
      {
        id: 66,
        label: "Contact Message",
        routePath: "/admin/contact-message",
      },
    ],
  },
  // ✅ COLLAPSE MENU END



  // {
  //   id: 5,
  //   label: "List Verified Candidate",
  //   routePath: "/admin/listverified",
  // },
  // {
  //   id: 6,
  //   label: "List Verified Employee",
  //   routePath: "/list-verified-employee",
  // },
];

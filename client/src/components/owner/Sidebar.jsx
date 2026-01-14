import React, { useEffect } from "react";
import { useAppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/data.js";
import { Link, NavLink, Outlet } from "react-router-dom";
import { UserButton, useUser } from "@clerk/clerk-react";

const Sidebar = () => {
  const { navigate, isOwner } = useAppContext();
  const { user } = useUser();

  const navItems = [
    {
      path: "/owner",
      label: "Dashboard",
      icon: assets.dashboard,
    },
    {
      path: "/owner/add-property",
      label: "Add Property",
      icon: assets.housePlus,
    },
    {
      path: "/owner/list-property",
      label: "List Property",
      icon: assets.list,
    },
  ];

  useEffect(() => {
    if (!isOwner) {
      navigate("/");
    }
  }, [isOwner, navigate]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-[1440px] flex flex-col xl:flex-row gap-4 p-3 xl:p-4">
        <aside className="w-full xl:w-72 xl:h-[95vh] xl:sticky xl:top-5 flex flex-col bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-5 xl:p-6 border-b border-slate-50 xl:border-none">
              <Link
                hide-on-mobile="true"
                to={"/owner"}
                className="flex items-center"
              >
                <img src={assets.logoImg} alt="logo" className="h-8 xl:h-10" />
              </Link>

              <div className="xl:hidden">
                <UserButton afterSignOutUrl="/" />
              </div>
            </div>

            <nav className="flex xl:flex-col gap-2 p-2 xl:p-6 overflow-x-auto no-scrollbar scroll-smooth flex-wrap">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/owner"}
                  className={({ isActive }) =>
                    `flex items-center gap-x-2.5 xl:gap-x-3 px-4 py-2.5 xl:py-3 rounded-xl transition-all duration-300 whitespace-nowrap xl:whitespace-normal flex-1 xl:flex-none justify-center xl:justify-start ${
                      isActive
                        ? "bg-secondary text-white shadow-xl shadow-secondary/20"
                        : "text-slate-600 hover:bg-slate-50 hover:text-secondary"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <img
                        src={item.icon}
                        alt={item.label}
                        className={`w-5 h-5 transition-all ${
                          isActive
                            ? "brightness-200 grayscale-0"
                            : "grayscale opacity-70"
                        }`}
                      />
                      <span className="text-[13px] xl:text-[15px] font-medium">
                        {item.label}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="hidden xl:flex items-center gap-3 p-4 m-4 mt-auto bg-slate-50 rounded-2xl border border-slate-100">
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: "w-10 h-10",
                  },
                }}
              />
              <div className="flex flex-col overflow-hidden">
                <span className="text-sm font-bold text-slate-800 truncate">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-[10px] text-slate-500 font-semibold tracking-wider">
                  Owner Account
                </span>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200/60 p-4 xl:p-8 min-h-[70vh]">
          <Outlet />
        </main>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `,
        }}
      />
    </div>
  );
};

export default Sidebar;

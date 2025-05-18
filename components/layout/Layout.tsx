import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import Header from "./Header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-hidden flex flex-col bg-gray-50">
        <Header />
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
};

export default Layout;

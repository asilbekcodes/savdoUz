import useUserStore from "@/store/useUserStore";
import { useMutation, useQuery } from "@tanstack/react-query";
import { get } from "lodash";
import { useEffect, useState } from "react";
import * as S from "./Layout.styles";
import Content from "./_components/Content";
import Header from "./_components/Header";
import Sidebar from "./_components/Sidebar";
import {
  httpGetCompany,
  httpGetMe,
} from "@/services/api/requests/auth.requests";
import useAuthStore from "@/store/useAuthStore";
import useCompanyStore from "@/store/useCompanyStore";

const DashboardLayout = () => {
  const [openSidebar, setOpenSidebar] = useState(window.innerWidth > 567);

  const { setMe } = useUserStore();
  const { setCompany } = useCompanyStore();
  const { accessToken } = useAuthStore();

  const me = useMutation({
    mutationKey: ["me"],
    mutationFn: httpGetMe,
    onSuccess: (data) => {
      setMe(get(data, "data", {}));
    },
  });

  const company = useMutation({
    mutationKey: ["company"],
    mutationFn: httpGetCompany,
    onSuccess: (data) => {
      setCompany(get(data, "data", {}));
    },
  });

  useEffect(() => {
    if (accessToken) {
      me.mutateAsync();
      company.mutateAsync();
    }
  }, [accessToken]);

  const toggleSidebar = () => {
    setOpenSidebar((prev) => !prev);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 567) {
        setOpenSidebar(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <S.Layout openSidebar={openSidebar}>
      <Sidebar
        openSidebar={openSidebar}
        toggleSidebar={toggleSidebar}
        setOpenSidebar={setOpenSidebar}
      />
      <div className="content-box">
        <Header openSidebar={openSidebar} toggleSidebar={toggleSidebar} />
        <Content />
      </div>
    </S.Layout>
  );
};

export default DashboardLayout;

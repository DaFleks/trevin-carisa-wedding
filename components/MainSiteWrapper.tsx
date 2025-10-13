"use client";

import { useToggle } from "@/hooks/useToggle";
import GeneralLogin from "./GeneralLogin";
import MainSite from "./MainSite";

const MainSiteWrapper = () => {
  const [isVerified, handleIsVerified] = useToggle(false);

  return <>{isVerified ? <MainSite /> : <GeneralLogin handleIsVerified={handleIsVerified} />}</>;
};

export default MainSiteWrapper;

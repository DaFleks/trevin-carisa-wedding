"use client";

import { CheckIcon, XIcon } from "lucide-react";

const CheckedResult = ({ flag }: { flag: boolean }) => {
  return <>{flag ? <CheckIcon className="text-emerald-600 mx-auto" /> : <XIcon className="text-rose-600 mx-auto" />}</>;
};

export default CheckedResult;

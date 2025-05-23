import { Suspense } from "react";
import Loader from "../Loader";

const SuspenseWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default SuspenseWrapper;

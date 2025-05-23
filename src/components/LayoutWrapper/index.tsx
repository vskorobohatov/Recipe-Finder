import { geistMono, geistSans } from "@/helpers/fonts";
import SuspenseWrapper from "../SuspenseWrapper";
import "../../app/globals.css";

const LayoutWrapper = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SuspenseWrapper>{children}</SuspenseWrapper>
      </body>
    </html>
  );
};

export default LayoutWrapper;
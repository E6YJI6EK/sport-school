import { FC } from "react";
import { Footer } from "src/widgets/Footer";
import { Header } from "src/widgets/Header";
interface LayoutProps {
  children: React.ReactNode;
}
export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

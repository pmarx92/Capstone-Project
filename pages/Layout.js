import Header from "../comp/Header/Header";
import Navigation from "../comp/Navigation/Navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Navigation />
    </div>
  );
}

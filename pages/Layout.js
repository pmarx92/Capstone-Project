import Header from "../components/Header/Header";
import Navigation from "../components/Navigation/Navigation";

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <main>{children}</main>
      <Navigation />
    </div>
  );
}

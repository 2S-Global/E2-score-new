export const metadata = {
  title: "GEISIL-Admin Dashboard",
  description: "E²-Score Job portal",
};
import AuthWrapper from "./AuthWrapper";
export default function Layout({ children }) {
  return <><AuthWrapper>{children}</AuthWrapper></>;
}

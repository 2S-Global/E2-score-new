export const metadata = {
  title: "GEISIL-Admin",
  description: "GEISIL-Admin",
};
import AuthWrapper from "./AuthWrapper";
export default function Layout({ children }) {
  return <><AuthWrapper>{children}</AuthWrapper></>;
}

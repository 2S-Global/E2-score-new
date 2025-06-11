export const metadata = {
  title: "GEISIL-Employer",
  description: "GEISIL-Employer Dashboard",
};
import AuthWrapper from "./AuthWrapper";
export default function Layout({ children }) {
  return <><AuthWrapper>{children}</AuthWrapper></>;
}

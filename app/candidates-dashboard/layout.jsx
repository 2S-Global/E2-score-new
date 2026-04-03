export const metadata = {
  title: "E²-Score Candidates Dashboard",
  description: "E²-Score Job portal",
};
import AuthWrapper from "./AuthWrapper";
export default function Layout({ children }) {
  return (
    <AuthWrapper>
      <div className="shadow-lg">{children}</div>
    </AuthWrapper>
  );
}

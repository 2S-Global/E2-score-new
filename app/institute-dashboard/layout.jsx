export const metadata = {
  title: "GEISIL-Institute",
  description: "GEISIL-Institute",
};
import AuthWrapper from "./AuthWrapper";
export default function Layout({ children }) {
  return (
    <>
      <AuthWrapper>
        <div className="shadow-lg">{children}</div>
      </AuthWrapper>
    </>
  );
}

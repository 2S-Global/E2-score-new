export const metadata = {
  title: "Geisil",
  description: "Geisil",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="container shadow-lg">{children}</div>
    </>
  );
}

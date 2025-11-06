export const metadata = {
  title: "E²-Score Job List",
  description: "job list",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="container shadow-lg">{children}</div>
    </>
  );
}

export const metadata = {
  title: "E²-Score All Applicants ",
  description: "E²-Score Job portal",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="container shadow-lg">{children}</div>
    </>
  );
}

export const metadata = {
  title: "E²-Score - Candidates List ",
  description: "E²-Score Job portal",
};

export default function Layout({ children }) {
  return (
    <>
      <div className="container shadow-lg">{children}</div>
    </>
  );
}

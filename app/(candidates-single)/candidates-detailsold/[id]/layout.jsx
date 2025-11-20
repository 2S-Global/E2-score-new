export const metadata = {
  title: "E²-Score - Candidate's details",
  description: "E²-Score Job portal",
};
export default function Layout({ children }) {
  return (
    <>
      <div className="container shadow-lg special-route">{children}</div>
    </>
  );
}

import Wrapper from "@/layout/Wrapper";
import Home from "@/components/home-1";

export const metadata = {
  title: "E²-Score",
  description: "E²-Score Job portal",
};

export default function page() {
  return (
    <Wrapper>
      <Home />
    </Wrapper>
  );
}

import Container from "@/components/aetherium/Container";

import Sidebar from "@/components/invitations/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Container className="size-full bg-neutral-300 text-slate-600 flex items-center">
      <Container className="w-4/5 h-[90%] mx-auto bg-neutral-200 border overflow-hidden border-neutral-100 shadow-md flex rounded-xl">
        <Sidebar />
        <Container as="main" className="grow p-4 flex flex-col gap-4 bg-neutral-100">
          {children}
        </Container>
      </Container>
    </Container>
  );
};

export default layout;

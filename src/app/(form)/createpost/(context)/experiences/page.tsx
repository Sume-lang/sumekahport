import { Container } from "@/components/elements/containers";
import ExperiencesForm from "./components/experiencesform";
import ExperienceList from "./components/experienceslist";
export default function CreateForm() {
  return (
    <Container className="flex lg:flex-row flex-col w-full h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86] overflow-hidden">
      <section className="flex flex-col w-full">
        <div className="pl-10 pr-4 pt-4">
          <h1 className="text-2xl font-bold">Experiences</h1>
        </div>
        <div className=" flex flex-col w-full p-2 gap-1">
          <div className="lg:w-1/2 w-full flex items-start justify-start rounded-md p-2">
            <ExperiencesForm />
          </div>
          <div className="w-full flex items-start justify-start lg:pt-10">
            <ExperienceList />
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center lg:pt-20">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
    </Container>
  );
}

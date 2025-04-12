import { Container } from "@/component/containers";
import ExperiencesForm from "./components/experienceForm";
import ExperienceList from "./components/content/experiences";
export default function CreateForm() {
  return (
    <Container className="flex flex-col w-full h-screen bg-gradient-to-br from-[#20202e] to-[#2d2d32] text-[#faad86] overflow-hidden">
      <section className="flex flex-col w-full">
        <div className="pl-10 pr-4 pt-4">
          <h1 className="text-2xl font-bold underline">Experiences</h1>
        </div>
        <div className=" flex flex-row w-full p-2 gap-1">
          <div className="w-1/2 flex items-start justify-start rounded-md p-2">
            <ExperiencesForm />
          </div>
          <div className="w-1/2 flex items-start justify-start">
            <ExperienceList />
          </div>
        </div>
      </section>
      <section className="flex items-center justify-center lg:pt-10">
        <div className="border-[#faad86]/20 border-b-[1px] lg:w-1/2 w-full shadow-lg p-2" />
      </section>
    </Container>
  );
}

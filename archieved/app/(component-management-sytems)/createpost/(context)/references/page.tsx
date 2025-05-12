import { Container } from "@/components/reusable/containers";
import ReferencesForm from "./components/referencesPerson";
import GetReferences from "./components/getReferences";
export default function References() {
  return (
    <Container className="flex flex-col border">
      <section className="lg:pt-10" />
      <section className="lg:pl-32 lg:pr-32 w-1/2">
        <ReferencesForm />
      </section>
      <section className="lg:pt-10" />
      <section className="lg:pl-32 lg:pr-32">
        <GetReferences />
      </section>
    </Container>
  );
}

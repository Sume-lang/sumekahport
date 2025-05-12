import { Container } from "@/components/reusable/containers";
import EducationForm from "./components/educationForm";
import EducationsBlog from "./components/educationBlog";
export default function Educations() {
  return (
    <Container>
      <section className="lg:pr-24 lg:pl-24 lg:pt-24">
        <EducationForm />
      </section>
      <section className="lg:pt-10" />
      <section className="lg:pr-24 lg:pl-24">
        <EducationsBlog />
      </section>
    </Container>
  );
}

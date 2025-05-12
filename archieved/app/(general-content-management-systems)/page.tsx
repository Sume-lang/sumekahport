import { Container } from "@/components/reusable/containers";
import {
  Hero,
  Services,
  Pricetag,
  Reusable,
  Profiles,
  BlogNews,
  Project,
} from "./components-second/composer";

export default function HomePages() {
  return (
    <Container className="flex flex-col">
      <section>
        <Hero />
      </section>
      <section className="h-5" />
      <section className="lg:px-24 lg:py-24">
        <Services />
      </section>
      <section className="h-5" />
      <section className="lg:px-24 lg:py-24">
        <Pricetag />
      </section>
      <section className="h-5" />
      <section className="lg:px-24 lg:py-24">
        <Reusable />
      </section>
      <section className="h-5" />
      <section className="lg:px-24 lg:py-24">
        <Profiles />
      </section>
      <section className="h-5" />
      <section className="lg:px-24 lg:py-24">
        <BlogNews />
      </section>
      <section className="h-5" />
      <section className="lg:px-24 lg:py-24">
        <Project />
      </section>
    </Container>
  );
}

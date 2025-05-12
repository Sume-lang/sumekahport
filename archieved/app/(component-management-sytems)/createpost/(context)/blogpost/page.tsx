import { Container } from "@/components/reusable/containers";
import BlogForm from "./components/blogForm";
export default function Blogpost() {
  return (
    <Container className="border">
      <section className=" flex flex-row border">
        <BlogForm />
      </section>
    </Container>
  );
}

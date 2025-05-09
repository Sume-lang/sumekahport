// import { Input } from "@/components/ui/input";

export default function BlogForm() {
  return (
    <main className="min-h-screen w-full flex flex-col">
      <section>
        <h1>Title:</h1>
      </section>
      <section className="flex lg:flex-row flex-col gap-2 h-[100%]">
        <div className="border w-full">Content Is Here</div>
        <div className="border lg:w-1/4 w-full">navigations</div>
      </section>
    </main>
  );
}

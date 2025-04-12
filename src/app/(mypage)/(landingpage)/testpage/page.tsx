import Experton from "./experinces";
import CreateForm from "./createexps";
export default function TestPage() {
  return (
    <main className="flex flex-col gap-2 mx-auto p-4 w-full">
      <h1 className="text-2xl font-bold mb-6">Test Page</h1>
      <div className="gap-4 w-full">
        <Experton />
      </div>
      <div>
        <CreateForm />
      </div>
    </main>
  );
}

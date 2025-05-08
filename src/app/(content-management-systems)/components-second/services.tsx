import DataService from "@/app/storages/services";

export default function Services() {
  return (
    <main>
      <section className="lg:flex flex-row grid grid-cols-2 gap-2">
        {DataService.map((items) => (
          <div
            key={items.id}
            className="lg:w-1/3 w-full h-auto border-[0.5px] border-[#faad86]/20 shadow-sm rounded-md lg:p-2 p-4"
          >
            <h1 className="font-bold">{items.title}</h1>
            <p className="lg:text-md text-sm font-light">{items.disc}</p>
            <div>
              {items.child.map((child) => (
                <div key={child.id} className="grid grid-cols-5 gap-2">
                  <h1 className="font-light text-md">{child.title}</h1>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

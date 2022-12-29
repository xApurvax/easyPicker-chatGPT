import Header from "./components/layout/Header";
import Tool from "./components/main/Tool";

function App() {
  return (
    <div className="">
      <main className="">
      {/* <main className="flex w-full justify-center items-center h-[500px]"> */}
        <Header />
        <Tool />
      {/* <span className="group relative">
          <span className="pointer-events-none absolute -top-1 left-8 translate-x-1/2 whitespace-nowrap rounded bg-black px-2 py-1 text-white opacity-0 transition before:absolute before:-left-2 before:top-12 before:-translate-y-10 before:rotate-90 before:border-4 before:border-transparent before:border-t-black before:content-[''] group-hover:opacity-100">
            hello
          </span>
        button
      </span> */}
      </main>
    </div>
  );
}

export default App;

const parcel = String(new URL("/public/parcel.svg", import.meta.url));
const react = String(new URL("/public/react.svg", import.meta.url));

const App = () => {
  return (
    <>
      <div className="h-screen w-full flex justify-center items-center">
        <div className="flex flex-col gap-y-4 items-center px-3">
          <div className=" px-2 py-4 flex flex-col md:flex-row items-center gap-x-2">
            <img
              src={parcel}
              alt="parcel"
              className="h-40 w-40 object-cover object-center drop-shadow-2xl"
            />
            <span className="text-2xl font-bold">+</span>
            <img
              src={react}
              alt="react"
              className="h-40 w-40 object-cover object-center"
            />
          </div>
          <h1
            className="text-center text-2xl sm:text-5xl font-bold drop-shadow-2xl"
            id="main-content"
          >
            React + Parcel + Typescript
          </h1>
          <h4 className="text-center text-xl sm:text-2xl font-medium text-gray-700">
            Bootstrapped with create-parcel-react-template
          </h4>
        </div>
      </div>
    </>
  );
};

export default App;

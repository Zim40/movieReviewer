export default function SearchMovies() {
  return (
    <>
      <section className="flex w-full align-center place-items-center justify-center p-4">
        <div className="flex align-center  place-items-center gap-2 flex-row-reverse w-full ">
          <button
            name="Search bar"
            className="border border-amber-400 text-amber-400 font-semibold px-2 rounded-full h-8"
          >
            Search
          </button>
          <input
            type="text"
            inputMode="text"
            placeholder="Search Movies"
            className="w-full border rounded-full h-8 border-amber-400 px-6 text-center"
          />
        </div>
      </section>
    </>
  );
}

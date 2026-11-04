

export default function AuthLayout({ image, imageAlt = "", title, children }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white p-4 md:p-8 font-['Poppins',sans-serif]">
      <div className="grid w-full container overflow-hidden rounded-3xl border border-gray-200 md:grid-cols-2">
        {/* Image side */}
        <div className="hidden md:block">
          <img src={image} alt={imageAlt} className="h-full w-full object-cover" />
        </div>

        {/* Form side */}
        <div className="flex flex-col justify-between px-8 py-12 sm:px-14 lg:px-20">
          <div>
            <h1 className="font-serif text-5xl font-semibold text-neutral-700">FASCO</h1>
            <h2 className="mt-16 font-serif text-2xl font-semibold text-black">{title}</h2>
            <div className="mt-6">{children}</div>
          </div>

          <p className="mt-12 text-right text-sm text-black">
            <a href="/terms" className="hover:underline">
              FASCO Terms &amp; Conditions
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
export default function ErrorPage() {
  return (
    <>
      <div className="mt-52 w-full grow lg:py-4 lg:mx-auto text-zinc-400 text-center text-2xl font-semibold lg:w-4/5 ">
        This page does not exist.
        <br/>
        <a href={"/"} className="text-zinc-500 text-sm hover:text-zinc-600 underline underline-offset-8 decoration-slate-800">
          Go home back to home page
        </a>
      </div>
    </>
  )
}
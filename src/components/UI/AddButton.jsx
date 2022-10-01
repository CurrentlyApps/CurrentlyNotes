export default function BigButton(props) {
    return (
        <>
            <button className="w-full rounded-md bg-zinc-500 p-2 text-zinc-50 shadow-md">
                { props.text }
            </button>
        </>
    )
}
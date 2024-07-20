import { Link2 } from "lucide-react"

interface LinksTrip{
    title: string | undefined,
    URL: string | undefined,
}

export function LinksTrip({title, URL}: LinksTrip){
    return(
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <h4>{title}</h4>
                <a className="text-zinc-400 text-xs" href="#">{URL}</a>
            </div>
            <Link2 className="size-5 text-zinc-400"/>
        </div>
    )
}
import { Link2 } from "lucide-react"

export function LinksTrip(){
    return(
        <div className="flex justify-between items-center">
            <div className="flex flex-col gap-1">
                <h4>Reserva Airbnb</h4>
                <a className="text-zinc-400 text-xs" href="#">https://www.youtube.com/watch?v=mfYUtROIzDk</a>
            </div>
            <Link2 className="size-5 text-zinc-400"/>
        </div>
    )
}
import { CircleCheck, CircleDashed } from "lucide-react"

interface EmailsTrips{
    key: string,
    id: number,
    name: string | undefined,
    email: string | undefined,
    is_confirmed: boolean | undefined,
}

export function EmailsTrips({id, name, email, is_confirmed}: EmailsTrips){

    return(
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h4>{name ?? `Convidaado ${id}` }</h4>
                <span className="text-zinc-400 text-xs">{email}</span>
            </div>
            { is_confirmed ? 
                (<CircleCheck className="size-5 text-green-400"/>) : 
                (<CircleDashed className="size-5 text-zinc-400"/>)
            }
            
        </div>
    )
}
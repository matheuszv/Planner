import { CircleCheck } from "lucide-react"

export function EmailsTrips(){
    return(
        <div className="flex justify-between items-center">
            <div className="flex flex-col">
                <h4>João Pedro</h4>
                <span className="text-zinc-400 text-xs">blabla@hotmail.com</span>
            </div>
            <CircleCheck className="size-5 text-green-400"/>
        </div>
    )
}
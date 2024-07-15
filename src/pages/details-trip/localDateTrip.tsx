import { MapPin, Calendar, Settings2 } from "lucide-react"

export function LocalDateTrip(){
    return (
        <div className="px-4 h-16 rounded-xl bg-zinc-900 flex items-center justify-between ">
            <div className="flex items-center gap-2">
                <MapPin className="size-5 text-zinc-400"></MapPin>
                <span className="text-zinc-100 text-lg">João Pessoa, PB</span>
            </div>
            <div className="flex gap-6 items-center">
                <div className="flex items-center gap-2">
                    <Calendar className="size-5 text-zinc-400"/>
                    <span className="text-zinc-100 text-lg"> 10 a 14 de Julho</span>
                </div>
            <div className="w-px h-6 bg-zinc-800" />
                <button className="bg-zinc-800 rounded-lg px-5 py-2 flex items-center gap-1 hover:bg-zinc-700">
                    Alterar local/data<Settings2/>
                </button>
            </div>
        </div>
    )
}
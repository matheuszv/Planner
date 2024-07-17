import { LocalDateTrip } from "./localDateTrip"
import { SideBar } from "./sidebar"
import { DaysPlans } from "./daysPlans"
import { Plus } from "lucide-react"

export function DetailsTrip(){
    return(
        <div className="max-w-6xl px-6 py-8 mx-auto space-y-8">
            <LocalDateTrip />
            <main className="flex gap-16 flex-wrap px-4">
                <div className="flex-1 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-zinc-50 text-3xl font-semibold">Atividade</h2>
                        <button className="bg-lime-300 rounded-lg text-lime-950 font-medium px-5 py-2 flex items-center gap-2 hover:bg-lime-400">
                            <Plus className="size-5"/> 
                            Cadastrar atividade
                        </button>
                    </div>
                    
                    <DaysPlans />
                </div>
                <SideBar />
            </main>
        </div>
    )
}
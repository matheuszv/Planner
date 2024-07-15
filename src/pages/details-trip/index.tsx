import { LocalDateTrip } from "./localDateTrip"
import { SideBar } from "./sidebar"

export function DetailsTrip(){
    return(
        <div className="max-w-6xl px-6 py-8 mx-auto space-y-8">
            <LocalDateTrip />
            <main className="flex gap-16 flex-wrap">
                <div className="flex-1 ">
                    <div className="flex items-center justify-between">
                        <h2>Atividade</h2>
                        <button>Adicionar</button>
                    </div>
                    
                </div>
                <SideBar />
            </main>
        </div>
    )
}
import { CircleCheck } from "lucide-react"
import { CircleDashed } from "lucide-react"

export function DaysPlans(){
    return(
        <div>
            <div className="space-y-8 w-full">
                <div className="space-y-2.5 w-full">
                    <div className="flex gap-3 items-baseline">
                        <h3 className="text-zinc-200 text-xl">Dia 17</h3>
                        <span className="text-xs text-zinc-500">Sábado</span>  
                    </div>  
                    <p className="text-sm text-zinc-500">Nenhuma atividade cadastrada nessa data.</p>
                </div>
                <div className="space-y-2.5 w-full">
                    <div className="flex gap-3 items-baseline">
                        <h3 className="text-zinc-200 text-xl">Dia 18</h3>
                        <span className="text-xs text-zinc-500">Domingo</span>  
                    </div>  
                    <div className="bg-zinc-900 flex flex-1 justify-between items-center rounded-lg w-full border border-zinc-800 px-4 py-2.5">
                        <div className="flex gap-2 items-center">
                            <CircleCheck className="size-5 text-lime-300"/>
                            <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        </div>
                        <span className="text-xs text-zinc-500">8:00h</span> 
                    </div>
                    <div className="bg-zinc-900 flex flex-1 justify-between items-center rounded-lg w-full border border-zinc-800 px-4 py-2.5">
                        <div className="flex gap-2 items-center">
                            <CircleDashed className="size-5 text-zinc-500"/>
                            <p>aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
                        </div>
                        <span className="text-xs text-zinc-500">18:00h</span> 
                    </div>
                </div>  
            </div>
        </div>    

                
                
    )
}
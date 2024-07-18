import { Plus } from "lucide-react"
import { UserCog } from "lucide-react"

import { LinksTrip } from "./linksTrip"
import { EmailsTrips } from "./emailsTrip"

interface LinksTrip{
    openModalNewLink: () => void;
}

export function SideBar({openModalNewLink}: LinksTrip){

    return(
        <div className="w-80 space-y-6">
            <div className="gap-6 flex flex-col">
                <h3 className="text-xl font-semibold">Links Importantes</h3>
                <div className="gap-3 flex flex-col">
                    <LinksTrip />
                    <LinksTrip />
                    <LinksTrip />
                </div>
                <button onClick={openModalNewLink} className="bg-zinc-800 text-zinc-200 w-full h-12 rounded-lg flex items-center justify-center gap-3">
                    <Plus className="size-5"/>
                    Cadastrar novo link
                </button>
                
                <div className="w-full h-px bg-zinc-800"/>

                <h3 className="text-xl font-semibold">Convidados</h3>
                <div className="gap-3 flex flex-col">
                    <EmailsTrips />
                </div>
                <button className="bg-zinc-800 text-zinc-200 w-full h-12 rounded-lg flex items-center justify-center gap-3">
                    <UserCog className="size-5"/>
                    Gerenciar Convidados
                </button>
            </div>
        </div>
    )
}
import { Plus, UserCog } from "lucide-react"

import { LinksTrip } from "./linksTrip"
import { EmailsTrips } from "./emailsTrip"
import { api } from "../../../lib/axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface ImportantLinks {

    id: string,
    title: string,
    url: string

}

interface LinksTrip{
    openModalNewLink: () => void;
    importantLinks: ImportantLinks[] | undefined;
}

interface Participants{
    id: string,
    name: string | undefined,
    email: string,
    is_confirmed: boolean
}



export function SideBar({openModalNewLink, importantLinks}: LinksTrip){

    
    const [participants, setParticipants] = useState<Participants[]>([])
    const { tripId } = useParams()


    useEffect(() => {
        api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
    }, [tripId])
    
    return(
        <div className="w-80 space-y-6">
            <div className="gap-6 flex flex-col">
                <h3 className="text-xl font-semibold">Links Importantes</h3>
                <div className="gap-3 flex flex-col">
                    
                    {!importantLinks || importantLinks.length == 0 ? (
                        <></>
                    ) : (
                        <div>
                            {importantLinks.map((link, index) => {
                                return(  
                                    <LinksTrip 
                                        key={index}
                                        title={link.title}
                                        URL={link.url}
                                    />
                                )
                            })}
                        </div>
                    )}
                    
                </div>
                <button onClick={openModalNewLink} className="bg-zinc-800 text-zinc-200 w-full h-12 rounded-lg flex items-center justify-center gap-3">
                    <Plus className="size-5"/>
                    Cadastrar novo link
                </button>
                
                <div className="w-full h-px bg-zinc-800"/>

                <h3 className="text-xl font-semibold">Convidados</h3>
                <div className="gap-3 flex flex-col">
                    {participants?.map((participant, index)=> {
                        return(
                            <EmailsTrips
                                key={participant.id}
                                id={index}
                                name={participant.name}
                                email={participant.email}
                                is_confirmed={participant.is_confirmed}
                            />
                        )
                    })}
                </div>
                <button className="bg-zinc-800 text-zinc-200 w-full h-12 rounded-lg flex items-center justify-center gap-3">
                    <UserCog className="size-5"/>
                    Gerenciar Convidados
                </button>
            </div>
        </div>
    )
}
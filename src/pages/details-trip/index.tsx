import { LocalDateTrip } from "./localDateTrip"
import { SideBar } from "./sidebar/sidebar"
import { DaysPlans } from "./daysPlans"
import { ModalNewPlan } from "./modalNewPlan"
import { ModalNewLink } from "./modalNewLink"
import { api } from "../../lib/axios"

import { Plus } from "lucide-react"

import { FormEvent, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"

interface Trip{
    id: string,
    destination: string,
    starts_at: string,
    ends_at: string,
    is_confirmed: boolean,
}

interface ImportantLinks {
    Title: string | undefined,
    URL: string | undefined,
}


export function DetailsTrip(){

    const [importantLinks, setImportantLinks] = useState<ImportantLinks[]>([])
    const [modalNewPlan,setModalNewPlan] = useState(false)
    const [modalNewLink, setModalNewLink] = useState(false)
    const [trip, setTrip] = useState<Trip | undefined>()
    
    const { tripId } = useParams()

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId])

    const displayDate = trip ? 
    format(trip?.starts_at, "d' de ' LLL").concat(" até ").concat(format(trip?.ends_at, "d' de ' LLL"))
    : ""

    function newImportantLink(event: FormEvent<HTMLFormElement>){
        const data = new FormData(event.currentTarget)
        let title = data.get('TITLE')
        let url = data.get('URL')
        if(!title || !url){
            event.preventDefault()
            return
        }
        title = title.toString()
        url = url.toString()

        const newLink: ImportantLinks = { Title: title, URL: url }
        setImportantLinks([...importantLinks, newLink])

        event.preventDefault()
    }

    function openModalNewPlan(){
        setModalNewPlan(true)
    }

    function closeModalNewPlan(){
        setModalNewPlan(false)
    }

    function openModalNewLink(){
        setModalNewLink(true)
    }

    function closeModalNewLink(){
        setModalNewLink(false)
    }

    return(
        <div className="max-w-6xl px-6 py-8 mx-auto space-y-8">
            <LocalDateTrip 
                destination={trip?.destination}
                displayDate={displayDate}
            />
            <main className="flex gap-16 flex-wrap px-4">
                <div className="flex-1 space-y-8">
                    <div className="flex items-center justify-between">
                        <h2 className="text-zinc-50 text-3xl font-semibold">Atividade</h2>
                        <button onClick={openModalNewPlan} className="bg-lime-300 rounded-lg text-lime-950 font-medium px-5 py-2 flex items-center gap-2 hover:bg-lime-400">
                            <Plus className="size-5"/> 
                            Cadastrar atividade
                        </button>
                    </div>
                    
                    <DaysPlans />
                </div>
                <SideBar
                    importantLink={importantLinks}
                    openModalNewLink={openModalNewLink}
                />
            </main>
            { modalNewPlan &&
                <ModalNewPlan
                    closeModalNewPlan={closeModalNewPlan}
                />
            }
            { modalNewLink &&
                <ModalNewLink 
                    newImportantLink={newImportantLink}
                    closeModalNewLink={closeModalNewLink}
                />
            }
        </div>
    )
}
import { LocalDateTrip } from "./localDateTrip"
import { SideBar } from "./sidebar/sidebar"
import { DaysPlans } from "./daysPlans"
import { ModalNewPlan } from "./modalNewPlan"
import { ModalNewLink } from "./modalNewLink"
import { ModalNewParticipants } from "./modalNewParticipant"
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
        id: string,
        title: string,
        url: string
}

interface Activities{
    date: string,
      activities: 
        {
          id: string,
          title: string,
          occurs_at: string
        }[]
    
}


export function DetailsTrip(){

    const [importantLinks, setImportantLinks] = useState<ImportantLinks[]>([])
    const [modalNewPlan,setModalNewPlan] = useState(false)
    const [modalNewLink, setModalNewLink] = useState(false)
    const [modalNewParticipants, setModalNewParticipants] = useState(false)
    const [trip, setTrip] = useState<Trip | undefined>()
    const [plans, setPlans] = useState<Activities[]>([])
    


    const { tripId } = useParams()

    useEffect(() => {
        api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
    }, [tripId])

    useEffect(() => {
        api.get(`/trips/${tripId}/activities`).then(response => setPlans(response.data.activities))
    }, [tripId])

    useEffect(() => {
        api.get(`/trips/${tripId}/links`).then(response => setImportantLinks(response.data.links))
    }, [tripId])

    const displayDate = trip ? 
    format(trip?.starts_at, "d' de ' LLL").concat(" até ").concat(format(trip?.ends_at, "d' de ' LLL"))
    : ""

    async function newImportantLink(event: FormEvent<HTMLFormElement>){
        
        event.preventDefault()
        const data = new FormData(event.currentTarget)
        let title = data.get('TITLE')
        let url = data.get('URL')
        if(!title || !url){
            return
        }
        title = title.toString()
        url = url.toString()

        await api.post(`/trips/${tripId}/links`, {
            title,
            url
        })
        window.document.location.reload()
    }

    async function newParticipant(event: FormEvent<HTMLFormElement>){
        event.preventDefault()

        const data = new FormData(event.currentTarget)
        let email = data.get('email')
        if(!email){
            return
        }
        email = email.toString()

        await api.post(`/trips/${tripId}/invites`, {
            email
        })

        window.document.location.reload()
    }

    async function setNewActivie(event: FormEvent<HTMLFormElement>){

        event.preventDefault()
  
        const data = new FormData(event.currentTarget)
  
        const title = data.get('title')?.toString()
        let occurs_at = data.get('occurs_at_day')?.toString()
        const occurs_at_time = data.get('occurs_at_time')?.toString()
        
        if(!occurs_at_time) return

        occurs_at = occurs_at?.concat("T").concat(occurs_at_time)

        console.log({title, occurs_at})
  
        await api.post(`/trips/${tripId}/activities`, {
            title,
            occurs_at
        })
  
        window.document.location.reload()
      }

    function openModalNewPlan(){
        setModalNewPlan(true)
    }

    function closeModalNewPlan(){
        setModalNewPlan(false)
    }

    function openModalNewParticipants(){
        setModalNewParticipants(true)
    }

    function closeModalNewParticipants(){
        setModalNewParticipants(false)
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
                    {plans.map(activity => {
                        return(
                            <DaysPlans 
                                activity={activity}
                            />
                        )
                    })}
                    
                </div>
                <SideBar
                    importantLinks={importantLinks}
                    openModalNewLink={openModalNewLink}
                    openModalNewParticipants={openModalNewParticipants}
                />
            </main>
            { modalNewPlan &&
                <ModalNewPlan
                    setNewActivie={setNewActivie}
                    closeModalNewPlan={closeModalNewPlan}
                />
            }
            { modalNewLink &&
                <ModalNewLink 
                    newImportantLink={newImportantLink}
                    closeModalNewLink={closeModalNewLink}
                />
            }
            { modalNewParticipants &&
                <ModalNewParticipants 
                    closeModalParticipants={closeModalNewParticipants}
                    newParticipant={newParticipant}
                />
            }
        </div>
    )
}
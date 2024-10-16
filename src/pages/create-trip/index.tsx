import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X} from 'lucide-react'
import { FormEvent, useState, ChangeEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalScreenInvite } from './modalScreenInvite'
import { ModalConfirmScreen } from './modalConfirmScreen'
import { DayPicker } from 'react-day-picker'
import { DateRange } from 'react-day-picker'
import { format } from 'date-fns'
//import { api } from '../../lib/axios'

import 'react-day-picker/dist/style.css';

export function CreateTrip() {

  const navigate = useNavigate()

  const [planConfirmed, setPlanConfirmed] = useState(false)
  const [modalScreen, setModalScreen] = useState(false)
  const [modalConfirmScreen, setModalConfirmScreen] = useState(false)
  const [modalSetDate, setModalSetDate] = useState(false)

  const [destination, setDestination] = useState('')
  const [eventStartandEnd, setEventStartAndEnd] = useState<DateRange | undefined>()
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])
  const [ownerName, setOwnerName] = useState('')
  const [ownerEmail, setOwnerEmail] = useState('')

  const displayDate = eventStartandEnd && eventStartandEnd.from && eventStartandEnd.to
    ? format(eventStartandEnd.from, "d' de ' LLL").concat(" até ").concat(format(eventStartandEnd.to, "d' de ' LLL"))
    : null

  const handleDestinationChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination(event.target.value);
  };

  const handleOwnerName = (event: ChangeEvent<HTMLInputElement>) => {
    setOwnerName(event.target.value);
  };

  const handleOwnerEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setOwnerEmail(event.target.value);
  };

  function openModalSetDate(){
    setModalSetDate(true)
  }

  function closeModalSetDate(){
    setModalSetDate(false)
  }
 
  function ConfirmedPlaceDate(){
    setPlanConfirmed(true)
  }

  function NoConfirmedPlaceDate(){
    setPlanConfirmed(false)
  }

  function openModalScreen(){
    setModalScreen(true)
  }

  function closeModalScreen(){
    setModalScreen(false)
  }

  function openModalConfirmScreen(){
    setModalConfirmScreen(true)
  }

  function closeModalConfirmScreen(){
    setModalConfirmScreen(false)
  }

  function addEmailToInvite(event: FormEvent<HTMLFormElement>){
      event.preventDefault()
      const data = new FormData(event.currentTarget)
      const newEmail = data.get('email')?.toString()
      
        if(!newEmail){
          return
        }

        if(emailsToInvite.includes(newEmail)){
          event.currentTarget.reset()
          return
        }

      setEmailsToInvite([...emailsToInvite, newEmail])
      event.currentTarget.reset()
  }

  function removeEmailToInvite(emailToRemove: string){
    const newList = emailsToInvite.filter(email => email != emailToRemove)

    setEmailsToInvite(newList)
  }

  async function createNewTrip(event: FormEvent<HTMLFormElement>){
    
    event.preventDefault()
    if(!destination){
      return
    }

    if(!eventStartandEnd?.from || !eventStartandEnd?.to){
      return
    }

    if(emailsToInvite.length===0){
      return
    }

    if(!ownerName || !ownerEmail){
      return
    }


    const response = await fetch('http://localhost:3333/trips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            destination,
            starts_at: eventStartandEnd.from,
            ends_at: eventStartandEnd.to,
            emails_to_invite: emailsToInvite,
            owner_name: ownerName,
            owner_email: ownerEmail
        })
    });
  
    if (response.ok) {
        const data = await response.json();
        console.log(data); // Manipule os dados recebidos, se necessário
        const { tripId } = data.tripId

        navigate(`http://localhost:3333/trips/${tripId}`)
    } else {
        console.error('Erro na requisição:', response.statusText);
    }

    
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-2">
          <img src="./assets/Logo.svg" alt="Logo Planner" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 w-full">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input type="text" onChange={handleDestinationChange} value={destination} placeholder="Para onde você vai?" disabled={planConfirmed} className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
            </div>
            <button onClick={openModalSetDate} disabled={planConfirmed} className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              {displayDate ? 
                (
                <span className="text-base text-zinc-100 w-48 text-left">
                    {displayDate}
                </span>
                ) : (
                  <span className="text-base text-zinc-400 w-48 text-left">
                    Quando?
                  </span>
                )
              }
            </button>
            <div className="w-px h-6 bg-zinc-800" />
            
            {planConfirmed ? 
            (<button onClick={NoConfirmedPlaceDate} className="bg-zinc-800 rounded-lg px-5 py-2 flex items-center gap-1 hover:bg-zinc-700">
              Alterar local/data<Settings2/>
            </button>) : (
            <button disabled={destination=='' || displayDate==null} onClick={ConfirmedPlaceDate} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-1 hover:bg-yellow-400">
              Continuar <ArrowRight/>
            </button>)
            }
          </div>
          { planConfirmed && (
              <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 w-full">
                <button onClick={openModalScreen} type="button" className="flex items-center gap-2 flex-1">
                  <UserRoundPlus className="size-5 text-zinc-400" />
                  { emailsToInvite.length > 0 ?
                    (<span className="text-lg text-zinc-200 text-left flex-1">{emailsToInvite.length} pessoa(s) convidada(s)</span>)
                    : (<span className="text-lg text-zinc-400 text-left flex-1">Quem estará na viagem?</span>)
                  }
                </button>
              
                <button disabled={destination=='' || !displayDate || emailsToInvite.length<=0} onClick={openModalConfirmScreen} type="button" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap hover:bg-yellow-400">
                    Confirmar Viagem <ArrowRight/>
                </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm"> Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a> . </p>
      </div>

      {
        modalSetDate && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center shadow-shape">
          <div className="rounded-xl bg-zinc-900 py-5 px-6 flex flex-col gap-3 text-zinc-300">
            <div className="flex justify-between">            
              <h2 className="text-white font-semibold text-lg ">Escolha os dias da viagem</h2>
              <button type="button" onClick={closeModalSetDate}><X/></button>
            </div>
            
            <DayPicker mode="range" selected={eventStartandEnd} onSelect={setEventStartAndEnd} />
          
          </div>
        </div>
        )
      }

      {modalScreen && (
       <ModalScreenInvite 
        closeModalScreen={closeModalScreen} 
        addEmailToInvite={addEmailToInvite}
        removeEmailToInvite={removeEmailToInvite}
        emailsToInvite={emailsToInvite}
       />
      )}

      {modalConfirmScreen && (
        <ModalConfirmScreen 
          closeModalConfirmScreen={closeModalConfirmScreen}
          createNewTrip={createNewTrip}
          handleOwnerName={handleOwnerName}
          handleOwnerEmail={handleOwnerEmail}
          ownerEmail={ownerEmail}
          ownerName={ownerName}
          
        />
      )}
    </div>
  )
}
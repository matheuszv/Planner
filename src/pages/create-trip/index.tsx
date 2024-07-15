import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2} from 'lucide-react'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ModalScreenInvite } from './modalScreenInvite'
import { ModalConfirmScreen } from './modalConfirmScreen'


export function CreateTrip() {

  const navigate = useNavigate()

  const [planConfirmed, setPlanConfirmed] = useState(false)
  const [modalScreen, setModalScreen] = useState(false)
  const [modalConfirmScreen, setModalConfirmScreen] = useState(false)
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([])
 
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

  function createNewTrip(event: FormEvent<HTMLFormElement>){
    event.preventDefault()
    navigate("trips/123")
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className="flex flex-col items-center gap-2">
          <img src="./public/Logo.svg" alt="Logo Planner" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3 w-full">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="size-5 text-zinc-400" />
              <input type="text" placeholder="Para onde você vai?" disabled={planConfirmed} className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"/>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400"/>
              <input type="text" placeholder="Quando?" disabled={planConfirmed} className="bg-transparent text-lg placeholder-zinc-400 w-40 outline-none"/>
            </div>
            <div className="w-px h-6 bg-zinc-800" />
            
            {planConfirmed ? 
            (<button onClick={NoConfirmedPlaceDate} className="bg-zinc-800 rounded-lg px-5 py-2 flex items-center gap-1 hover:bg-zinc-700">
              Alterar local/data<Settings2/>
            </button>) : (
            <button onClick={ConfirmedPlaceDate} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-1 hover:bg-yellow-400">
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
              
                <button onClick={openModalConfirmScreen} type="button" className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap hover:bg-yellow-400">
                    Confirmar Viagem <ArrowRight/>
                </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm"> Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a> . </p>
      </div>

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
        />
      )}
    </div>
  )
}
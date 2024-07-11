import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, AtSign, Plus, X} from 'lucide-react'
import { useState } from 'react'
export function App() {

  const [planConfirmed, setPlanConfirmed] = useState(false)
  const [modalScreen, setModalScreen] = useState(false)

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
                  <span className="text-lg text-zinc-400 text-left flex-1">Quem estará na viagem?</span>
                </button>
              
                <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap hover:bg-yellow-400">
                    Confirmar Viagem <ArrowRight/>
                </button>
            </div>
          )}
        </div>

        <p className="text-zinc-500 text-sm"> Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
        com nossos <a href="#" className="text-zinc-300 underline">termos de uso</a> e <a href="#" className="text-zinc-300 underline">políticas de privacidade</a> . </p>
      </div>

      {modalScreen && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center shadow-shape">
          <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 flex flex-col gap-3">
            <div className="flex justify-between">            
              <h2 className="text-white font-semibold text-lg ">Selecionar convidados</h2>
              <button type="button" onClick={closeModalScreen}><X/></button>
            </div>
            <p className="text-zinc-400 text-sm">Os convidados irão receber emails para confirmar a participação na viagem.</p>
            <div>Emails@gmails.com <X/></div>
            <div className="h-px w-full bg-zinc-800" />
            <div className=" bg-black rounded-lg flex items-center gap-2 w-full border p-2.5">
              <AtSign className="size-5 text-zinc-400"/>
              <input type="text" placeholder="Digite o email do convidado" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"/>
              <button className="bg-lime-300 text-lime-950 rounded-lg px-2 py-3 flex font-medium items-center gap-1 hover:bg-yellow-400">
                    Convidar <Plus className="size-5"/>
              </button>
            </div>
            
          </div>
        </div>
      )}

    </div>
  )
}

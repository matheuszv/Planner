import {X , MailPlus} from "lucide-react"
import { FormEvent } from "react";

interface ModalNewParticipants{
    closeModalParticipants: () => void;
    newParticipant: (event: FormEvent<HTMLFormElement> ) => void;
}

export function ModalNewParticipants({closeModalParticipants, newParticipant}: ModalNewParticipants){

    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center shadow-shape">
          <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 flex flex-col gap-3">
            <div className="flex justify-between">            
              <h2 className="text-white font-semibold text-lg ">Cadastrar participante</h2>
              <button type="button" onClick={closeModalParticipants}><X className="size-5 text-zinc-400"/></button>
            </div>
            <p className="text-zinc-400 text-sm">O participante receberá um convite pelo e-mail.</p>
            <div className="h-px w-full bg-zinc-800" />

            <form onSubmit={newParticipant} className="flex flex-col gap-2">
              <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                <MailPlus className="size-5 text-zinc-400"/>
                <input required type="email" name="email" placeholder="E-mail" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
              </div>
              <button className="bg-lime-300 text-lime-950 mt-1.5 rounded-lg p-3 flex font-medium items-center text-center justify-center hover:bg-yellow-400">
                    Enviar convite
              </button>
            </form>
          </div>
        </div>
    )
}
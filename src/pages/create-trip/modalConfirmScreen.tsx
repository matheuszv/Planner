import { X, User, Mail } from "lucide-react"
import { FormEvent } from "react";

interface modalConfirmScreen{
    closeModalConfirmScreen: () => void;
    createNewTrip: (event: FormEvent<HTMLFormElement>) => void;
}

export function ModalConfirmScreen({ closeModalConfirmScreen, createNewTrip}: modalConfirmScreen){
    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center shadow-shape">
          <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 flex flex-col gap-3">
            <div className="flex justify-between">            
              <h2 className="text-white font-semibold text-lg ">Confirmar criação da viagem</h2>
              <button type="button" onClick={closeModalConfirmScreen}><X/></button>
            </div>
            <p className="text-zinc-400">Para concluir a criação da viagem para <strong className="text-zinc-50">Florianópolis, Brasil</strong> nas datas de <strong className="text-zinc-50">16 a 27 de Agosto de 2024</strong> preencha seus dados abaixo:</p>
            <div className="h-px w-full bg-zinc-800" />

            <form onSubmit={createNewTrip} className="flex flex-col gap-2">
              <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                <User className="size-5 text-zinc-400"/>
                <input type="text" name="username" placeholder="Seu nome completo" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
              </div>
              <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                <Mail className="size-5 text-zinc-400"/>
                <input type="email" name="email" placeholder="Seu e-mail pessoal" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
              </div>
              <button className="bg-lime-300 text-lime-950 mt-1.5 rounded-lg p-3 flex font-medium items-center text-center justify-center hover:bg-yellow-400">
                    Convidar criação da viagem
              </button>
            </form>
            
          </div>
        </div>
    )
}
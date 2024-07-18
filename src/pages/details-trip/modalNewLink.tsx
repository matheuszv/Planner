import {X, Tag, Link2} from "lucide-react"

interface ModalNewLink{
    closeModalNewLink: () => void;
}

export function ModalNewLink({closeModalNewLink}: ModalNewLink){


    return(
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center shadow-shape">
          <div className="w-[640px] rounded-xl bg-zinc-900 py-5 px-6 flex flex-col gap-3">
            <div className="flex justify-between">            
              <h2 className="text-white font-semibold text-lg ">Cadastrar link</h2>
              <button type="button" onClick={closeModalNewLink}><X className="size-5 text-zinc-400"/></button>
            </div>
            <p className="text-zinc-400 text-sm">Todos convidados podem visualizar os links importantes.</p>
            <div className="h-px w-full bg-zinc-800" />

            <form className="flex flex-col gap-2">
              <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                <Tag className="size-5 text-zinc-400"/>
                <input type="text" name="Title" placeholder="Título do link" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
              </div>
              <div className=" bg-zinc-950 rounded-lg flex items-center gap-3 w-full border border-zinc-800 p-3.5">
                <Link2 className="size-5 text-zinc-400"/>
                <input type="text" name="URL" placeholder="URL" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none font-light"/>
              </div>
              <button className="bg-lime-300 text-lime-950 mt-1.5 rounded-lg p-3 flex font-medium items-center text-center justify-center hover:bg-yellow-400">
                    Salvar link
              </button>
            </form>
          </div>
        </div>
    )
}
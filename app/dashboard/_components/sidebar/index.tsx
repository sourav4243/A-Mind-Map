import { List } from "./list"
import { NewButton } from "./NewButton"

export const Sidebar = () =>{
    return(
        <aside className="fixed z-[1] left-0 bg-gradient-to-b from-[#8645f7] to-[#45008f] h-full w-[60px] flex flex-col p-3 gap-y-4">
            <List/>
            <NewButton/>
        </aside>
    )
}
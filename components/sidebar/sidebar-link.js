export default function SidebarLink(props) {
    const {Icon, text, active} = props
  return (
    <div className={`text-[#d9d9d9] flex justify-center items-center xl:justify-start
     text-xl space-x-3 hoverAnimation ${active && "font-bold"}`}>
        <Icon  className="h-7"/>
        <span className="hidden xl:inline">{text}</span>
    </div>
  )
}

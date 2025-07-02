export default function Header() {
    return (
        <header
            className='w-[100%] z-10 flex justify-between items-center py-5 px-4 
      2xl:max-h-[100px]'
        >
            {/* PongDang AnPongDang ? */}
            <a
                className="font-semibold animate-bounce text-[1.8rem] text-white 
                xl:text-[2.5rem] xl:font-bold"
                href="#main">
                <span className="hover:text-orange-600">P</span>
                <span className="hover:text-orange-500">O</span>
                <span className="hover:text-orange-300">N</span>
                <span className="hover:text-orange-200">G</span>
                <span> </span>
                <span className="hover:text-orange-600">D</span>
                <span className="hover:text-orange-500">A</span>
                <span className="hover:text-orange-300">N</span>
                <span className="hover:text-orange-200">G</span>
            </a>
        </header>
    )
}
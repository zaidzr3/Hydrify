const Footer = () => {
    return(
        <div className="bg-gray-900 py-4 shadow-md">
            <div className="contaner mx-auto flex justify-between items-center px-5 lg:px-10">
                <span className="text-3xl text-teal-400 font-bold tracking-tight">
                    Hydrify
                </span>
                <span className="text-teal-400 font-bold tracking-tight flex gap-4">
                    <p className="cursor-pointer">Contact US</p>
                    <p className="cursor-pointer">Terms of service</p>

                </span>
            </div>
        </div>
        
    )
}
export default Footer;
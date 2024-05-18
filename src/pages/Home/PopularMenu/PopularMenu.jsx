// import React, { useEffect, useState } from "react"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import MenuItem from "../../Shared/MenuItem/MenuItem"
import useMenu from "../../../hooks/useMenu"

const PopularMenu = () => {
    const [menu] = useMenu()
    console.log(menu)
    const popular = menu.filter((item) => item.category === "popular")
    //             setMenu(popularItems)
    // const [menu, setMenu] = useState([])
    // useEffect(() => {
    //     fetch("menu.json")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             const popularItems = data.filter((item) => item.category === "popular")
    //             setMenu(popularItems)
    //         })
    // }, [])

    return (
        <section className="mb-12">
            <SectionTitle heading={"From Our Menu"} subHeading={"Check it out"}></SectionTitle>
            <div className="grid md:grid-cols-2 gap-px">
                {popular.map((item) => (
                    <MenuItem key={item._id} item={item}></MenuItem>
                ))}
            </div>
            <button className="btn btn-outline border-0 border-b-4 text-white">View Full name</button>
        </section>
    )
}

export default PopularMenu

import React, { useEffect, useState } from "react"
import SectionTitle from "../../../components/SectionTitle/SectionTitle"
import MenuItem from "../../Shared/MenuItem/MenuItem"

const PopularMenu = () => {
    const [menu, setMenu] = useState([])
    useEffect(() => {
        fetch("menu.json")
            .then((res) => res.json())
            .then((data) => {
                const popularItems = data.filter((item) => item.category === "popular")
                setMenu(popularItems)
            })
    }, [])

    return (
        <section className="mb-12">
            <SectionTitle heading={"From Our Menu"} subHeading={"Check it out"}></SectionTitle>
            <div className="grid md:grid-cols-2 gap-px">
                {menu.map((item) => (
                    <MenuItem key={item._id} item={item}></MenuItem>
                ))}
            </div>
            <button className="btn btn-outline border-0 border-b-4 text-white">View Full name</button>
        </section>
    )
}

export default PopularMenu
